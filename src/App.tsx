import React, { useState } from 'react';
// types
import { fetchQuizQuestions, QuestionState, Difficulty } from './API';
import './App.css';

// Components
import { QuestionCard } from './components/QuestionCard';

// Global Styles

import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject  = {
  question: string;
  answer: string;
  correct: boolean
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  // States
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  // console.log({questions});

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setUserAnswers([]);
    setScore(0);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if(!gameOver) {
      // user's answer
      const answer = e.currentTarget.value;

      // Check answer against correct answer

      const correct = questions[number].correct_answer === answer;

      // Add Score if correct

      if(correct) setScore(prev => prev + 1);

      // Save answer in the array of user answers

      const answerObject =  {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAnswers((prev) => [...prev, answerObject]);

    }

  }

  const nextQuestion = () => {

    // Move onto the next question if not the last
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  }

  return (
    <>
        <GlobalStyle />
        <Wrapper>
            <h1>Quizzster </h1>

            {/* Multiline Ternary operator */}

            { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <button className="start" onClick={startQuiz}> Start </button>
            ) : null }

          {/* Standard Ternary operator */}

          { !gameOver ? <p className="score"> Score: { score } </p> : null }


          {/* Short circuit, if statement true then show thing after && */}

          { loading && <p className="loading"> Loading Questions... </p>  }
            { (!loading && !gameOver) && (
                <QuestionCard
                  questionNo = { number + 1 }
                  totalQuestions = { TOTAL_QUESTIONS }
                  question = { questions[number].question }
                  answers = { questions[number].answers }
                  userAnswer = { userAnswers ? userAnswers[number] : undefined }
                  callback = {checkAnswer}
                />
            )}
            { (!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1) && (
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            )}
        </Wrapper>
    </>
  );
};

export default App;
