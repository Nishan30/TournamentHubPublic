"use client";

import React, { useState } from 'react';
import RaceTrack from '@/components/racingCar/RaceTrack';
import TypingArea from '@/components/racingCar/TypingArea';
import { getRandomSentences } from '@/utils/textGenerator';

const App: React.FC = () => {
    const [typedText, setTypedText] = useState<string>('');
    const [wpm, setWpm] = useState<number>(0);
    const [raceStarted, setRaceStarted] = useState<boolean>(false);
    const [targetTexts, setTargetTexts] = useState<string[]>([]); // Store multiple sentences
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0); // Track which sentence is being typed
  
    const handleTyping = (text: string, wpm: number) => {
      setTypedText(text);
      setWpm(wpm);
    };
  
    const startRace = () => {
      setTargetTexts(getRandomSentences(3)); // Get 3 random sentences
      setCurrentSentenceIndex(0);
      setRaceStarted(true);
      setTypedText('');
      setWpm(0); // Reset WPM and progress
    };
  
    const appStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    };
  
    const titleStyle: React.CSSProperties = {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    };
  
    return (
      <div style={appStyle}>
        <h1 style={titleStyle}>Type Racer Game</h1>
        <RaceTrack
          typedText={typedText}
          wpm={wpm}
          targetTexts={targetTexts}
          currentSentenceIndex={currentSentenceIndex}
        />
        <TypingArea
          onTyping={handleTyping}
          raceStarted={raceStarted}
          startRace={startRace}
          targetTexts={targetTexts}
          currentSentenceIndex={currentSentenceIndex}
          setCurrentSentenceIndex={setCurrentSentenceIndex}
        />
      </div>
    );
  };
  
  export default App;