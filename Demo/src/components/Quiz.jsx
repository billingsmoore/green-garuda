// src/components/Quiz.jsx
import React, { useState } from 'react';
import './Quiz.css'; // Ensure we have styles for the feedback animation and progress bar

export default function Quiz({ data, onCorrect, onWrong, learned }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [completed, setCompleted] = useState(false);

  const current = data[index];

  // Randomize options for multiple choice
  const getRandomOptions = () => {
    const options = [current.transliteration];
    while (options.length < 4) {
      const randomOption = data[Math.floor(Math.random() * data.length)].transliteration;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const options = getRandomOptions();

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === current.transliteration;
    if (isCorrect) {
      setFeedback('✅ Correct!');
      onCorrect(current)
    } else {
      setFeedback(`❌ Incorrect. Answer: ${current.transliteration}`);
      onWrong(current); // Add to wrong answers array
    }

    setTimeout(() => {
      if (index + 1 >= data.length) {
        setCompleted(true);
      } else {
        setIndex((prev) => prev + 1);
        setFeedback('');
      }
    }, 1000);
  };

  const progress = ((index + 1) / data.length) * 100;

  if (completed) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>🎉 Quiz Complete!</h2>
        <p>Nice work — you've finished this unit.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '1rem',
        padding: '1rem',
        display: 'inline-block'
      }}>
        {current.letter}
      </div>
      <div style={{ marginTop: '2rem' }}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              fontSize: '1.2rem',
              padding: '0.8rem 1.5rem',
              margin: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              backgroundColor: '#f4f4f4',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback with animation */}
      <div
        className={`feedback ${feedback ? 'show' : ''}`}
        style={{ marginTop: '1rem', fontSize: '1.2rem' }}
      >
        {feedback}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: '2rem', width: '80%', margin: '0 auto' }}>
        <div
          className="progress-bar"
          style={{ width: `${progress}%`, height: '10px', borderRadius: '5px', backgroundColor: '#4caf50' }}
        />
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'gray' }}>
        Progress: {index + 1} / {data.length}
      </div>
    </div>
  );
}