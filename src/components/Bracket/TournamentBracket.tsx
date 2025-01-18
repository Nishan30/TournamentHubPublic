import React from "react";
import { type Match } from "@/types/tournament";
import { BracketMatch } from "./BracketMatch";
import { BracketConnector } from "./BracketConnector";

interface TournamentBracketProps {
  matches: Match[];
}

export const TournamentBracket: React.FC<TournamentBracketProps> = ({ matches }) => {
  const matchHeight = 160; // Height of a single match
  let adjustedIndex = 0;
  let height: number[] = [];

  const bracketMatches = matches.filter((m) => m.type === "single-elimination");

  // Create a map of matches for quick access
  const matchMap: { [key: string]: Match } = {};
  bracketMatches.forEach((match) => {
    matchMap[match._id] = match;
  });

  // Initialize ordered matches per round
  const orderedMatchesByRound: { [key: number]: Match[] } = {};
  const processedMatches = new Set<string>();

  function processMatch(match: Match) {
    if (processedMatches.has(match._id)) {
      return;
    }
    processedMatches.add(match._id);

    // Initialize the array for this round if not already done
    if (!orderedMatchesByRound[match.round]) {
      orderedMatchesByRound[match.round] = [];
    }

    // Add match to the ordered list for its round
    orderedMatchesByRound[match.round].push(match);

    // Find matches that feed into this match
    const childMatches = bracketMatches.filter((m) => m.nextMatchId === match._id);

    // Process child matches
    childMatches.forEach((childMatch) => {
      processMatch(childMatch);
    });
  }

  // Find final matches (no nextMatchId)
  const finalMatches = bracketMatches.filter(
    (match) => !match.nextMatchId || match.nextMatchId === ""
  );

  if (finalMatches.length === 0) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">No matches</h2>
      </div>
    );
  }

  // Start processing from the final matches
  finalMatches.forEach((finalMatch) => {
    processMatch(finalMatch);
  });

  // Determine the maximum number of rounds
  const maxRounds = Math.max(...Object.keys(orderedMatchesByRound).map(Number));

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Tournament Bracket</h2>
      <div className="flex gap-20 pb-40 px-8 overflow-x-auto">
        {Array.from({ length: maxRounds }, (_, i) => i + 1).map((round) => {
          const matchesByRound = orderedMatchesByRound[round] || [];
          const spacing = Math.pow(2, round - 1) * matchHeight;

          return (
            <div
              key={round}
              className="flex-shrink-0 flex flex-col relative"
              style={{
                width: "280px",
                minHeight: `${Math.max(matchesByRound.length * spacing, matchHeight)}px`,
              }}
            >
              {/* Round Header */}
              <div
                className="mb-6 sticky top-0 bg-card z-10 py-2 shadow-md"
                style={{
                  paddingBottom: "20px", // Ensure spacing between header and matches
                }}
              >
                <h3 className="text-lg font-semibold text-muted-foreground text-center">
                  Round {round}
                </h3>
              </div>

              {/* Matches */}
              {matchesByRound.map((match, index) => {
                let verticalPosition = index * spacing + (spacing - matchHeight) / 2 + 60;
                if (round > 1) {
                  verticalPosition = (height[adjustedIndex] + height[adjustedIndex + 1]) / 2;
                }
                height.push(verticalPosition);

                return (
                  <div key={match._id}>
                    <div
                      className="absolute left-0 right-0"
                      style={{
                        top: verticalPosition,
                      }}
                    >
                      <BracketMatch match={match} isLastRound={round === maxRounds} />
                    </div>
                    {round > 1 && (
                      <>
                        <BracketConnector
                          round={round}
                          currentPos={verticalPosition + matchHeight / 2 - 8}
                          topPos={height[adjustedIndex] + matchHeight / 2 - 8}
                          bottomPos={height[adjustedIndex + 1] + matchHeight / 2 - 8}
                        />
                        <div className="invisible">
                          {adjustedIndex += 2}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};