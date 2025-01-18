import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import MatchModel, { IMatchModel } from '@/models/matchesModel';
import ParticipantData, { IParticipantData } from '@/models/participantDataModel';
import TournamentModel from '@/models/tournamentModel';
import ArbriterData, { IArbriterData } from '@/models/arbriterDataModel';
import { Match } from '@/types/tournament';

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}


function createMatchObject(
  participants: IParticipantData[],
  arbiter: IArbriterData,
  round: number,
  matchDate: Date,
  tournamentId: string,
  type: string
): IMatchModel {
  return new MatchModel({
    participants,
    arbiter,
    teamName: participants.map(p => p.teamName || ''), // Handle empty team names
    round,
    matchDate,
    tournamentId,
    status:"Not Started",
    scores: [], 
    arbiterComment: '', 
    nextMatchId:'',
    type,
  });
}

export default async function createMatches(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { tournamentId, groupSize, matchesPerDay, rounds} = req.body;

  try {
    const tournament = await TournamentModel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    const tournamentType = tournament.tournamentType;

    const participants = await ParticipantData.find({ tournamentId });
    const arbiters = await ArbriterData.find({ tournamentId });

    if (participants.length < 2) {
      return res.status(400).json({ error: 'Not enough participants to create matches' });
    }

    const shuffledParticipants = shuffleArray(participants);
    const matches: IMatchModel[] = [];

    const updatedParticipants = addByeIfNeeded(shuffledParticipants);

    // Calculate total days and ensure startDate and endDate are valid
    const start = tournament.startDate
    const end = tournament.endDate;
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (totalDays <= 0) {
      return res.status(400).json({ error: 'Invalid date range' });
    }

    switch (tournamentType) {
      case 'league-based':
        createLeagueMatches(updatedParticipants, arbiters, matches, tournamentId, matchesPerDay, start, totalDays);
        break;
      case 'single-elimination':
        createSingleElimination(updatedParticipants, arbiters, matches, tournamentId, matchesPerDay, start, totalDays);
        break;
      case 'double-elimination':
        createDoubleElimination(updatedParticipants, arbiters, matches, tournamentId, matchesPerDay, start, totalDays);
        break;
      case 'swiss':
        createSwissStyle(updatedParticipants, arbiters, rounds, matches, tournamentId, matchesPerDay, start, totalDays);
        break;
      case 'combination':
        createCombinationTournament(updatedParticipants, arbiters, groupSize, matches, tournamentId, matchesPerDay, start, totalDays);
        break;
      case 'custom-scoring':
        createCustomScoringTournament(updatedParticipants, arbiters, rounds, matches, tournamentId, matchesPerDay, start, totalDays);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported tournament type' });
    }

    // Bulk insert matches for better performance
    await MatchModel.insertMany(matches);

    return res.status(201).json({ success: true, matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error});
  }
}

function addByeIfNeeded(participants: IParticipantData[]) {
  if (participants.length % 2 !== 0) {
    // Add the "bye" participant to the list
    participants.push(new ParticipantData ({
      id: "dswad",
      name: "Bye",
      email: "bye@gmail.com",
      teamName: "",
      questions: "",
      walletAddress: "",
      paymentDetails: "",
      entryFeeDetails: "",
      phoneNumber: "",
      tournamentId: ""}));
  }
  return participants;
}


// Helper to determine the match date based on matchesPerDay and available days
function calculateMatchDate(currentMatchIndex: number, matchesPerDay: number, startDate: Date, totalDays: number): Date {
  const dayIndex = Math.floor(currentMatchIndex / matchesPerDay);
  const matchDate = new Date(startDate);
  matchDate.setDate(startDate.getDate() + (dayIndex % totalDays));
  return matchDate;
}

// Updated League Matches Logic
function createLeagueMatches(
  participants: IParticipantData[],
  arbiters: IArbriterData[],
  matches: IMatchModel[],
  tournamentId: string,
  matchesPerDay: number,
  startDate: Date,
  totalDays: number
) {
  let currentMatchIndex = 0;

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const arbiter = arbiters[(i + j) % arbiters.length];
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      matches.push(
        createMatchObject(
          [participants[i], participants[j]],
          arbiter,
          1,
          matchDate,
          tournamentId,
          'league'
        )
      );

      currentMatchIndex++;
    }
  }
}

function createSingleElimination(
  participants: IParticipantData[], 
  arbiters: IArbriterData[], 
  matches: IMatchModel[], 
  tournamentId: string, 
  matchesPerDay: number, 
  startDate: Date, 
  totalDays: number
) {
  let round = 1;
  let currentMatchIndex = 0;

  // Ensure the number of participants is a power of two by adding byes if necessary
  const totalParticipants = participants.length;
  const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(totalParticipants)));
  const byesNeeded = nextPowerOfTwo - totalParticipants;
  const nullParticipant: IParticipantData[] = [];

  // Add bye participants if needed
  for (let i = 0; i < byesNeeded; i++) {
    participants.push(new ParticipantData({
      id: `bye-${i}`,
      name: "Bye",
      email: `bye-${i}@example.com`,
      teamName: "",
      questions: "",
      walletAddress: "",
      paymentDetails: "",
      entryFeeDetails: "",
      phoneNumber: "",
      tournamentId: tournamentId,
    }));
  }
  let roundIndex = 0;

  // Function to generate matches for a given round
  const generateMatches = (roundParticipants: IParticipantData[], round: number) => {
    const nextRoundParticipants: IParticipantData[] = [];


    for (let i = 0; i < roundParticipants.length; i += 2) {
      const arbiter = arbiters[i % arbiters.length]; // Assign arbiter in a round-robin fashion
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      const matchParticipants = round === 1
        ?  roundParticipants.slice(i, i + 2)  // First round: actual participants
        : nullParticipant;

      const isByeMatch = matchParticipants.some(p => p.name === "Bye");

      // If it's a bye match, the participant without "Bye" advances automatically
      if (isByeMatch) {
        const advancingParticipant = matchParticipants.find(p => p.name !== "Bye");
        if (advancingParticipant) {
          nextRoundParticipants.push(advancingParticipant);
        }
      } else {
        // If it's a regular match, push a placeholder for the winner
        nextRoundParticipants.push(new ParticipantData({
          id: `winner-of-match-${currentMatchIndex}`,
          name: "next",
          email: "next",
          teamName: "",
          questions: "",
          walletAddress: "",
          paymentDetails: "",
          entryFeeDetails: "",
          phoneNumber: "",
          tournamentId: tournamentId
        }));
      }

      // Create match object with nextMatchId and previousMatchIds
      const match: IMatchModel = createMatchObject(
        matchParticipants,
        arbiter,
        round,
        matchDate,
        tournamentId,
        'single-elimination'
      );

      // Link the previous match to the current match
      if (round > 1) {
        console.log("roundIndex" + roundIndex);
        console.log(matches.length);
        const previousMatch1 = matches[roundIndex];
        const previousMatch2 = matches[roundIndex + 1];
        previousMatch1.nextMatchId = match.id;
        previousMatch2.nextMatchId = match.id;
        roundIndex += 2;
      }

      matches.push(match);
      currentMatchIndex++;
    }


    return nextRoundParticipants;
  };

  let currentRoundParticipants = participants;
  while (currentRoundParticipants.length > 1) {
    currentRoundParticipants = generateMatches(currentRoundParticipants, round);
    round++; 
  }
}
function createDoubleElimination(
  participants: IParticipantData[],
  arbiters: IArbriterData[],
  matches: IMatchModel[],
  tournamentId: string,
  matchesPerDay: number,
  startDate: Date,
  totalDays: number
) {
  let upperBracketParticipants = participants;
  let lowerBracketParticipants: IParticipantData[] = [];
  let round = 1;
  let currentMatchIndex = 0;
  const nullParticipant: IParticipantData[] = [];

  // Upper bracket matches
  while (upperBracketParticipants.length > 1) {
    const nextRoundParticipants: IParticipantData[] = [];

    for (let i = 0; i < upperBracketParticipants.length; i += 2) {
      const arbiter = arbiters[i % arbiters.length];
      const currentMatchParticipants = upperBracketParticipants.slice(i, i + 2);
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      // For first round, actual participants are set
      // For subsequent rounds, participants are set as null (because winners are undecided)
      const matchParticipants = round === 1
        ? currentMatchParticipants  // First round: actual participants
        : nullParticipant;  // Subsequent rounds: participants set to null (undecided)

      matches.push(
        createMatchObject(
          matchParticipants,
          arbiter,
          round,
          matchDate,
          tournamentId,
          'double-eliminationWinner'
        )
      );

      nextRoundParticipants.push(currentMatchParticipants[0]); // Simulate winner (first participant wins)
      currentMatchIndex++;
    }

    upperBracketParticipants = nextRoundParticipants;
    round++;
  }

  // After upper bracket ends, participants go to the lower bracket
  // The losers of the upper bracket matches will be added to the lower bracket
  lowerBracketParticipants = upperBracketParticipants;  // Transfer the remaining participants from the upper bracket

  // Lower bracket matches (after first elimination)
  round = 1;
  while (lowerBracketParticipants.length > 1) {
    const nextRoundParticipants: IParticipantData[] = [];

    for (let i = 0; i < lowerBracketParticipants.length; i += 2) {
      const arbiter = arbiters[i % arbiters.length];
      const currentMatchParticipants = lowerBracketParticipants.slice(i, i + 2);
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      // For first round, actual participants are set
      // For subsequent rounds, participants are set as null (because winners are undecided)
      const matchParticipants = nullParticipant;
      matches.push(
        createMatchObject(
          matchParticipants,
          arbiter,
          round,
          matchDate,
          tournamentId,
          'double-eliminationLoser'
        )
      );

      nextRoundParticipants.push(currentMatchParticipants[0]); // Simulate winner (first participant wins)
      currentMatchIndex++;
    }

    lowerBracketParticipants = nextRoundParticipants;
    round++;
  }
}


// Updated Swiss Style Logic
function createSwissStyle(
  participants: IParticipantData[],
  arbiters: IArbriterData[],
  rounds: number,
  matches: IMatchModel[],
  tournamentId: string,
  matchesPerDay: number,
  startDate: Date,
  totalDays: number
) {
  let round = 1;
  let currentMatchIndex = 0;

  while (round <= rounds) {
    for (let i = 0; i < participants.length; i += 2) {
      const arbiter = arbiters[i % arbiters.length];
      const currentMatchParticipants = participants.slice(i, i + 2);
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      matches.push(
        createMatchObject(
          currentMatchParticipants,
          arbiter,
          round,
          matchDate,
          tournamentId,
          'swiss'
        )
      );

      currentMatchIndex++;
    }
    round++;
  }
}


// Updated Combination Tournament Logic (Group Stage + Knockout)
function createCombinationTournament(
  participants: IParticipantData[],
  arbiters: IArbriterData[],
  groupSize: number,
  matches: IMatchModel[],
  tournamentId: string,
  matchesPerDay: number,
  startDate: Date,
  totalDays: number
) {
  let currentMatchIndex = 0;
  let groupRound = 1;

  // Group Stage: Divide participants into groups of groupSize
  const groups = chunkArray(participants, groupSize);

  // Create group stage matches
  for (const group of groups) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const arbiter = arbiters[(i + j) % arbiters.length];
        const currentMatchParticipants = [group[i], group[j]];
        const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

        matches.push(
          createMatchObject(
            currentMatchParticipants,
            arbiter,
            groupRound,
            matchDate,
            tournamentId,
            'combination'
          )
        );

        currentMatchIndex++;
      }
    }
    groupRound++;
  }

  // Knockout Stage: After the group stage, proceed to knockout rounds (similar to single-elimination)
  let knockoutParticipants = groups.flat(); // All participants who qualified
  let round = 1;

  while (knockoutParticipants.length > 1) {
    const nextRoundParticipants: IParticipantData[] = [];

    for (let i = 0; i < knockoutParticipants.length; i += 2) {
      const arbiter = arbiters[i % arbiters.length];
      const currentMatchParticipants = knockoutParticipants.slice(i, i + 2);
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      matches.push(
        createMatchObject(
          currentMatchParticipants,
          arbiter,
          round,
          matchDate,
          tournamentId,
          'combination'
        )
      );

      nextRoundParticipants.push(currentMatchParticipants[0]); // Simulate a winner
      currentMatchIndex++;
    }

    knockoutParticipants = nextRoundParticipants;
    round++;
  }
}


// Updated Custom Scoring Tournament Logic
function createCustomScoringTournament(
  participants: IParticipantData[],
  arbiters: IArbriterData[],
  rounds: number,
  matches: IMatchModel[],
  tournamentId: string,
  matchesPerDay: number,
  startDate: Date,
  totalDays: number
) {
  let round = 1;
  let currentMatchIndex = 0;

  // Custom scoring can vary, but for simplicity, we'll just treat it similarly to single-elimination or swiss
  while (round <= rounds) {
    for (let i = 0; i < participants.length; i += 2) {
      const arbiter = arbiters[i % arbiters.length];
      const currentMatchParticipants = participants.slice(i, i + 2);
      const matchDate = calculateMatchDate(currentMatchIndex, matchesPerDay, startDate, totalDays);

      matches.push(
        createMatchObject(
          currentMatchParticipants,
          arbiter,
          round,
          matchDate,
          tournamentId,
          'custom-scoring'
        )
      );

      currentMatchIndex++;
    }
    round++;
  }
}

