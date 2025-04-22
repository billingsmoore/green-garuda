import React, { useState } from 'react';
import './Flashcard.css';

export default function Flashcard({ data }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % data.length);
  };

  const current = data[index];

  return (
    <div className="flashcard-wrapper">
      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="front">
            <div className="letter">{current.letter}</div>
          </div>
          <div className="back">
            <div className="translit">{current.transliteration}</div>
            {current.meaning && (
              <div className="meaning">({current.meaning})</div>
            )}
          </div>
        </div>
      </div>
      <button className="next-btn" onClick={nextCard}>Next</button>
    </div>
  );
}