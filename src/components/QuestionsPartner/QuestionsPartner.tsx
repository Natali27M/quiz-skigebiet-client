import React, { FC } from "react";

import { DataQuestionsPartner } from "../../interfaces";
import css from "../Questions/Questions.module.css";

const QuestionsPartner: FC<{ dataQuestionsPartner: DataQuestionsPartner }> = ({
    dataQuestionsPartner: {
        addLeadingZeroPartner,
        activeQuestionPartner,
        questionColorsPartner,
        partnerData,
        numberQuestionPartner,
        onAnswerSelectedPartner,
        getAnswerClassPartner,
    },
}) => {
    const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={css.quizMain}>
            <div>
                <span className="active-question-no">
          Frage {addLeadingZeroPartner(activeQuestionPartner + 1)}
                </span>
                <span className="total-question"> von {addLeadingZeroPartner(10)}</span>
            </div>
            <div className={css.lineBox}>
                {lines.map(( index) => (
                    <div
                        key={index}
                        className={css.line}
                        style={{ background: questionColorsPartner[index - 1] || "grey" }}
                    />
                ))}
            </div>
            <div className={css.questionsBox}>
                <div className={css.questionsBoxHeader}>
                    <h2>Frage {addLeadingZeroPartner(activeQuestionPartner + 1)}</h2>
                    <p>{partnerData[numberQuestionPartner].question}</p>
                </div>
                <ul>
                    <li
                        onClick={() => onAnswerSelectedPartner("a")}
                        className={getAnswerClassPartner("a")}
                    >
                        {partnerData[numberQuestionPartner].options.a}
                    </li>
                    <li
                        onClick={() => onAnswerSelectedPartner("b")}
                        className={getAnswerClassPartner("b")}
                    >
                        {partnerData[numberQuestionPartner].options.b}
                    </li>
                    <li
                        onClick={() => onAnswerSelectedPartner("c")}
                        className={getAnswerClassPartner("c")}
                    >
                        {partnerData[numberQuestionPartner].options.c}
                    </li>
                    <li
                        onClick={() => onAnswerSelectedPartner("d")}
                        className={getAnswerClassPartner("d")}
                    >
                        {partnerData[numberQuestionPartner].options.d}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export { QuestionsPartner };
