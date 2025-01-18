import type { Match, Standing } from "@/types/tournament";

export const calculateStandings = (matches: Match[]): Standing[] => {
  const standingsMap = new Map<string, Standing>();

  matches.forEach((match) => {

    match.participants.forEach((participant, index) => {
      if (!standingsMap.has(participant.name)) {
        standingsMap.set(participant.name, {
          name: participant.name,
          teamName: participant.teamName,
          points: 0,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
        });
      }
      if (match.status !== "Complete") return;

      const standing = standingsMap.get(participant.name)!;
      const ownScore = match.scores[index].score;
      const opponentScore = match.scores[1 - index].score;

      standing.played += 1;
      standing.goalsFor += ownScore;
      standing.goalsAgainst += opponentScore;
      standing.goalDifference = standing.goalsFor - standing.goalsAgainst;

      if (ownScore > opponentScore) {
        standing.points += 3;
        standing.won += 1;
      } else if (ownScore === opponentScore) {
        standing.points += 1;
        standing.drawn += 1;
      } else {
        standing.lost += 1;
      }

      standingsMap.set(participant.name, standing);
    });
  });

  return Array.from(standingsMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
};