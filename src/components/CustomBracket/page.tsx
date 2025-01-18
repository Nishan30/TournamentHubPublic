// components/CustomBracket.tsx
import React from 'react';
import { IRoundProps } from '@/models/matchesModel';

interface CustomBracketProps {
  rounds: IRoundProps[];
}

const CustomBracket: React.FC<CustomBracketProps> = ({ rounds }) => {
  return (
    <div className="bracket-container">
      {rounds.map((round, index) => (
        <div key={index} className="round">
          <h2 className="round-title">{round.title}</h2>
          <div className="seeds">
            {round.seeds.map((seed, seedIndex) => (
              <div key={seedIndex} className="seed">
                <div className="seed-date">{seed.date}</div>
                <div className="seed-teams">
                  {seed.teams.map((team, teamIndex) => (
                    <div key={teamIndex} className="team">{team.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export {CustomBracket};
