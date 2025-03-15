import React, { useState } from "react";
import "./App.css";

const initialFlashcards = [
  { question: "What is the capital of El Salvador?", answer: "San Salvador" },
  { question: "What is the capital of Honduras?", answer: "Tegucigalpa" },
  { question: "What is the capital of Spain?", answer: "Madrid" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of Italy?", answer: "Rome" },
  { question: "What is the capital of Germany?", answer: "Berlin" },
  { question: "What is the capital of Japan?", answer: "Tokyo" },
  { question: "What is the capital of Canada?", answer: "Ottawa" },
  { question: "What is the capital of Australia?", answer: "Canberra" },
  { question: "What is the capital of Brazil?", answer: "Brasília" },
];

export default function FlashcardApp() {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const checkAnswer = () => {
    const correctAnswer = flashcards[currentIndex].answer.toLowerCase().trim();
    const userAnswer = userInput.toLowerCase().trim();

    if (correctAnswer === userAnswer) {
      setFeedback(<span className="correct">✅ Correct!</span>);
    } else {
      setFeedback(<span className="incorrect">❌ Incorrect. Try again.</span>);
    }
  };

  const nextCard = () => {
    setFeedback("");
    setShowAnswer(false);
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFeedback("");
    setShowAnswer(false);
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  const shuffleCards = () => {
    setFlashcards([...flashcards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setFeedback("");
  };

  return (
    <div className="app-container">
      <h1 className="title">Flashcard App</h1>
      <p className="card-count">Total Cards: {flashcards.length}</p>

      {flashcards.length > 0 ? (
        <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
          <p className="card-text">
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </p>
        </div>
      ) : (
        <p>No more cards remaining!</p>
      )}

      {flashcards.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Enter your guess"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={checkAnswer}>Submit</button>
          <p className="feedback">{feedback}</p>

          <button className="nav-button" onClick={prevCard}>Previous</button>
          <button className="nav-button" onClick={nextCard}>Next</button>
          <button className="shuffle-button" onClick={shuffleCards}>Shuffle</button>
          
          <p>Current Streak: {streak}</p>
          <p>Longest Streak: {maxStreak}</p>
        </>
      )}
    </div>
  );
}
