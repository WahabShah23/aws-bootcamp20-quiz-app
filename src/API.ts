import { shuffleArray } from './UTILS';

// Api call and logic


export type Question = {
   category: string;
   correct_answer: string;
   difficulty: string;
   incorrect_answers: string[];
   question: string;
   type: string;
}

// for combining questions and answers in one to loop over them later
export type QuestionState = Question & {answers: string[] };

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty, category?: number, type?: any) => {

    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    // const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&type=multiple`

    // double await because first it will await the fetch (endpoint) call and then it will await when the response is converted to json

    const data = await ( await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer
            ]),
        }
    ));
    // console.log({data});

}