import React from 'react';
import './TextToSpeech.css';

const TextToSpeech = ({ text, lang = 'en-US' }) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <button className="tts-button" onClick={speak} aria-label="Play audio">
      <span role="img" aria-label="speaker">🔊</span>
    </button>
  );
};

export default TextToSpeech;
