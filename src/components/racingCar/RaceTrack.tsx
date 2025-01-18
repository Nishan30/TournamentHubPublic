import React from 'react';
import Car from './Car';

interface RaceTrackProps {
  typedText: string;
  wpm: number;
  targetTexts: string[];
  currentSentenceIndex: number;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ typedText, wpm, targetTexts, currentSentenceIndex }) => {
  const totalWords = targetTexts.reduce((acc, sentence) => acc + sentence.split(/\s+/).length, 0);
  const wordsTypedSoFar = targetTexts.slice(0, currentSentenceIndex).reduce((acc, sentence) => acc + sentence.split(/\s+/).length, 0);
  const correctWordsTyped = typedText.trim().split(/\s+/).length;
  const totalCorrectWordsTyped = wordsTypedSoFar + correctWordsTyped;

  const progress = (totalCorrectWordsTyped / totalWords) * 100;

  const trackContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '600px',
    height: '50px',
    backgroundColor: '#e0e0e0',
    position: 'relative',
    marginBottom: '20px',
    borderRadius: '8px',
  };

  const progressStyle: React.CSSProperties = {
    fontSize: '18px',
    marginBottom: '10px',
  };

  return (
    <div>
      <div style={trackContainerStyle}>
        <Car progress={progress} />
      </div>
      <p style={progressStyle}>Words per minute (WPM): {Math.round(wpm)}</p>
      <p style={progressStyle}>Progress: {Math.round(progress)}%</p>
    </div>
  );
};

export default RaceTrack;
