import React from "react";

interface BracketConnectorProps {
  round: number;
  currentPos: number;
  topPos: number;
  bottomPos: number;
}

export const BracketConnector: React.FC<BracketConnectorProps> = ({
  round,
  currentPos,
  topPos,
  bottomPos,
}) => {
  if (round <= 1) return null;

  // Calculate vertical positions based on the current match position
  const currentMatchCenter = currentPos;
  
  // Calculate the vertical offset for the previous matches
  const prevMatch1Y = topPos;
  const prevMatch2Y =bottomPos;

  return (
    <>
      {/* Horizontal connector to current match */}
      <div 
        className="absolute h-[2px] bg-border"
        style={{
          top: currentMatchCenter,
          right: "100%",
          width: "2rem",
        }}
      />
      
      {/* Vertical connector line */}
      <div 
        className="absolute w-[2px] bg-border"
        style={{
          right: "calc(100% + 2rem)",
          top: prevMatch1Y ,
          height: prevMatch2Y - prevMatch1Y,
        }}
      />

      {/* Horizontal connectors to previous matches */}
      <div 
        className="absolute h-[2px] bg-border"
        style={{
          top: prevMatch1Y ,
          right: "calc(100% + 2rem)",
          width: "4.5rem",
        }}
      />
      <div 
        className="absolute h-[2px] bg-border"
        style={{
          top: prevMatch2Y,
          right: "calc(100% + 2rem)",
          width: "4.5rem",
        }}
      />
    </>
  );
};