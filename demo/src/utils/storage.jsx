export function saveProgress(learned, wrongAnswers, unitKey) {
    localStorage.setItem(`learned_${unitKey}`, JSON.stringify([...learned]));
    localStorage.setItem(`wrong_${unitKey}`, JSON.stringify(wrongAnswers));
  }
  
  export function loadProgress(unitKey) {
    const learned = new Set(JSON.parse(localStorage.getItem(`learned_${unitKey}`) || '[]'));
    const wrongAnswers = JSON.parse(localStorage.getItem(`wrong_${unitKey}`) || '[]');
    return { learned, wrongAnswers };
  }
  
  