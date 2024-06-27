import React, { FC } from "react";

import css from "./Questions.module.css";
import { DataQuestions } from "../../interfaces";

const Questions: FC<{ dataQuestions: DataQuestions }> = ({
    dataQuestions: {
        addLeadingZero,
        activeQuestion,
        questionColors,
        myData,
        numberQuestion,
        onAnswerSelected,
        getAnswerClass,
    },
}) => {
    const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={css.quizMain}>
            <div>
                <span className="active-question-no">
          Frage {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className="total-question"> von {addLeadingZero(10)}</span>
            </div>
            <div className={css.lineBox}>
                {lines.map(( index) => (
                    <div
                        key={index}
                        className={css.line}
                        style={{ background: questionColors[index - 1] || "grey" }}
                    />
                ))}
            </div>
            <div className={css.questionsBox}>
                <div className={css.questionsBoxHeader}>
                    <h2>Frage {addLeadingZero(activeQuestion + 1)}</h2>
                    <p>{myData[numberQuestion].question}</p>
                </div>
                <ul>
                    <li
                        onClick={() => onAnswerSelected("a")}
                        className={getAnswerClass("a")}
                    >
                        {myData[numberQuestion].options.a}
                    </li>
                    <li
                        onClick={() => onAnswerSelected("b")}
                        className={getAnswerClass("b")}
                    >
                        {myData[numberQuestion].options.b}
                    </li>
                    <li
                        onClick={() => onAnswerSelected("c")}
                        className={getAnswerClass("c")}
                    >
                        {myData[numberQuestion].options.c}
                    </li>
                    <li
                        onClick={() => onAnswerSelected("d")}
                        className={getAnswerClass("d")}
                    >
                        {myData[numberQuestion].options.d}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export { Questions };
