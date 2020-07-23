import React from 'react';

import { AnswerObject } from '../App';

import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

// Interface
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNo, totalQuestions}) => {
    return (
        <Wrapper>
            {/* which question user is on? */}
            <p className="number">
                Question: {questionNo} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}} />
            <div>
                {answers.map(answer => (
                    // for implicit return use parentheses
                    <ButtonWrapper
                        key={answer}
                        correct={ userAnswer?.correctAnswer === answer }
                        userClicked={ userAnswer?.answer === answer }

                    >
                        {/* <button disabled={userAnswer ? true : false} value={answer} onClick={callback} /> */}
                        <button disabled={!!userAnswer} value={answer} onClick={callback} >
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>

                ))}
            </div>
        </Wrapper>
    )
}

// export default QuestionCard;
