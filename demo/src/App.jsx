// src/App.jsx
import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import Review from './components/Review';

import { tibetanAlphabet } from './data/alphabet';
import { tibetanSyllables } from './data/syllables';
import { tibetanWords } from './data/commonWords';

import './App.css';

// Save/load progress helpers
function saveProgress(learned, wrongAnswers, unitKey) {
  localStorage.setItem(`learned_${unitKey}`, JSON.stringify([...learned]));
  localStorage.setItem(`wrong_${unitKey}`, JSON.stringify(wrongAnswers));
}

function loadProgress(unitKey) {
  const learned = new Set(JSON.parse(localStorage.getItem(`learned_${unitKey}`) || '[]'));
  const wrongAnswers = JSON.parse(localStorage.getItem(`wrong_${unitKey}`) || '[]');
  return { learned, wrongAnswers };
}

const units = {
  alphabet: {
    name: 'Alphabet',
    data: tibetanAlphabet,
  },
  syllables: {
    name: 'Basic Syllables',
    data: tibetanSyllables,
  },
  words: {
    name: 'Common Words',
    data: tibetanWords,
  },
};

const addToWrongAnswers = (incorrectQuestion) => {
  setWrongAnswers((prev) => [...prev, incorrectQuestion]);
};

const handleComplete = () => {
  if (wrongAnswers.length > 0) {
    alert('You have some incorrect answers to review!');
  }
};

const startReview = () => {
  setReviewing(true); // Start reviewing wrong answers
};

export default function App() {
  const [unit, setUnit] = useState('alphabet');
  const [mode, setMode] = useState('flashcard'); // flashcard | quiz | review
  const [learned, setLearned] = useState(new Set());
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const currentUnit = units[unit];

  // Load progress when unit changes
  useEffect(() => {
    const { learned, wrongAnswers } = loadProgress(unit);
    setLearned(learned);
    setWrongAnswers(wrongAnswers);
  }, [unit]);

  function handleCorrect(letter) {
    const updated = new Set(learned);
    updated.add(letter);
    setLearned(updated);
    saveProgress(updated, wrongAnswers, unit);
  }

  function handleWrong(item) {
    const updated = [...wrongAnswers, item];
    setWrongAnswers(updated);
    saveProgress(learned, updated, unit);
  }

  function handleResetProgress() {
    localStorage.removeItem(`learned_${unit}`);
    localStorage.removeItem(`wrong_${unit}`);
    setLearned(new Set());
    setWrongAnswers([]);
  }

  return (
    <div className="App">
      <h1>Learn Tibetan 📚</h1>

      {/* Unit Selector */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {Object.keys(units).map((key) => (
          <button
            key={key}
            onClick={() => {
              setUnit(key);
              setMode('flashcard');
            }}
            style={{ marginRight: '0.5rem' }}
          >
            {units[key].name}
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setMode('flashcard')}>🃏 Flashcards</button>
        <button onClick={() => setMode('quiz')}>📝 Quiz</button>
        <button onClick={() => setMode('review')}>🔁 Review</button>
        <button onClick={handleResetProgress} style={{ marginLeft: '1rem' }}>
          🔄 Reset Progress
        </button>
      </div>

      {/* Render current mode */}
      {mode === 'flashcard' && <Flashcard data={currentUnit.data} />}
      {mode === 'quiz' && (
        <Quiz
          data={currentUnit.data}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          learned={learned}
        />
      )}
      {mode === 'review' && <Review wrongAnswers={wrongAnswers} />}
    </div>
  );
}