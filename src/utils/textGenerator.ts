export const getRandomSentences = (numSentences: number): string[] => {
    const sentences = [
      'The quick brown fox jumps over the lazy dog.',
      'A journey of a thousand miles begins with a single step.',
      'To be or not to be, that is the question.',
      'All that glitters is not gold.',
      'Actions speak louder than words.',
      'Fortune favors the bold.',
      'Knowledge is power.',
    ];
  
    const randomSentences = [];
    for (let i = 0; i < numSentences; i++) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      randomSentences.push(sentences[randomIndex]);
    }
    return randomSentences;
  };
  