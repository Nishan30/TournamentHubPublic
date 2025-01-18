export interface ParticipantData {
  _id: string
  name: string;
  email: string;
  teamName:string;
}
export interface ArbiterData {
  _id: string
  name: string;
  email: string;
  teamName:string;
}

export interface IScore {
  participantId: string; 
  score: number; 
}

export interface Match {
  _id: string;
  participants: ParticipantData[];
  arbiter: ArbiterData;
  teamName: string[];
  round: number;
  matchDate: Date;
  tournamentId: string;
  type:string;
  status:string;
  scores: IScore[]; 
  arbiterComment: string;
  nextMatchId?: string; 
}
export interface Standing {
  name: string;
  teamName: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface ITournament {
  _id: string;
  name: string;
  organizerName: string;
  email: string;
  description: string;
  rules: string;
  location: string;
  playerCount: string;
  leagueTournament: boolean;
  tournamentType:string
  hasPlayerList: boolean;
  needsArbriter: boolean;
  isIndividual: boolean;
  publicTournament: boolean;
  paymentSystem: boolean;
  startDate: Date;
  endDate: Date;
}