// src/components/Bracket.tsx
import React from 'react';
import { IMatchModel } from '@/models/matchesModel';

interface BracketProps {
  matches: IMatchModel[];
  round: number;
}

const Bracket: React.FC<BracketProps> = ({ matches, round }) => {
  // Group matches by the current round
  const currentRoundMatches = matches.filter(match => match.round === round);

  // Base case: If there are no matches in the current round, return null
  if (currentRoundMatches.length === 0) return null;

  // Recursive case: Render matches and the next round
  return (
    <div className="round">
      <div className="matches">
        {currentRoundMatches.map(match => (
          <div className="match" key={match._id as string}>
            <div className="team">
              {match.teamName ? match.teamName.join(' vs. ') : 'N/A'}
            </div>
            <div className="participants">
              {match.participants.map(participant => participant.name).join(', ')}
            </div>
            <div className="arbiter">
              Arbiter: {match.arbiter ? match.arbiter.name : 'N/A'}
            </div>
            <div className="date">
              {new Date(match.matchDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <Bracket matches={matches} round={round + 1} />
    </div>
  );
};

export default Bracket;
