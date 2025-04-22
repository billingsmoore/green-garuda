// src/components/Review.jsx
// src/components/Review.jsx
import React from 'react';

export default function Review({ wrongAnswers }) {
  if (wrongAnswers.length === 0) {
    return <div>No incorrect answers to review! Keep going! 🎉</div>;
  }

  return (
    <div>
      <h2>Review Incorrect Answers</h2>
      {wrongAnswers.map((item, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>{item.letter}</div>
          <div style={{ fontSize: '1.5rem', color: 'gray' }}>
            Correct answer: {item.transliteration}
          </div>
        </div>
      ))}
    </div>
  );
}

