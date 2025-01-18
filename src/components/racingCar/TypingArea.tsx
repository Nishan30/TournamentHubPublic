import React, { useState } from 'react';

interface TypingAreaProps {
  onTyping: (text: string, wpm: number) => void;
  raceStarted: boolean;
  startRace: () => void;
  targetTexts: string[]; // Array of sentences
  currentSentenceIndex: number;
  setCurrentSentenceIndex: (index: number) => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  onTyping,
  raceStarted,
  startRace,
  targetTexts,
  currentSentenceIndex,
  setCurrentSentenceIndex,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);

  const handleStartClick = () => {
    setInputText('');
    setStartTime(Date.now());
    setErrors(0);
    startRace();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputText(value);

    // Ensure there is a target text available
    if (currentSentenceIndex < targetTexts.length) {
      const targetText = targetTexts[currentSentenceIndex];
      let correctTextLength = 0;
      let mistakes = 0;

      for (let i = 0; i < value.length; i++) {
        if (i < targetText.length && value[i] === targetText[i]) {
          correctTextLength++;
        } else {
          mistakes++;
        }
      }
      setErrors(mistakes);

      const correctWordsTyped = value.slice(0, correctTextLength).trim().split(/\s+/).filter(Boolean).length;
      const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
      const wpm = correctWordsTyped / timeElapsed;

      onTyping(value.slice(0, correctTextLength), wpm);

      // Move to next sentence when the current one is typed correctly
      if (value === targetText) {
        if (currentSentenceIndex < targetTexts.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1);
          setInputText(''); // Clear input for the next sentence
        } else {
          alert('Race finished!');
        }
      }
    }
  };

  const correctTextStyle: React.CSSProperties = {
    color: 'green',
  };

  const incorrectTextStyle: React.CSSProperties = {
    color: 'red',
  };

  const remainingTextStyle: React.CSSProperties = {
    color: 'black',
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    width: '300px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  };

  // Ensure we are checking if targetTexts has content and currentSentenceIndex is valid
  const targetText = currentSentenceIndex < targetTexts.length ? targetTexts[currentSentenceIndex] : '';

  // Ensure correctText is sliced based on the lesser of inputText or targetText length
  const correctText = targetText.slice(0, Math.min(inputText.length, targetText.length)).split('').map((char, index) => (
    inputText[index] === char
      ? <span key={index} style={correctTextStyle}>{char}</span>
      : <span key={index} style={incorrectTextStyle}>{char}</span>
  ));

  const remainingText = targetText.slice(inputText.length);

  return (
    <div>
      <div>
        <span>{correctText}</span><span style={remainingTextStyle}>{remainingText}</span>
      </div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        disabled={!raceStarted}
        placeholder="Start typing..."
        style={inputStyle}
      />
      {!raceStarted && <button onClick={handleStartClick} style={buttonStyle}>Start Race</button>}
      <div>Errors: {errors}</div>
    </div>
  );
};

export default TypingArea;
