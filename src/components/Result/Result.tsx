import React, { FC } from "react";

import css from "./Result.module.css";
import { progressMessages, resultMessages } from "../../data";
const getMessage = (type: "result" | "progress", key: number | string): string => {
    if (type === "result") {
        return resultMessages[key as number] || resultMessages[0];
    }
    if (type === "progress") {
        return progressMessages[key as string] || progressMessages["default"];
    }
    return "";
};

const Result: FC<{ showResult: boolean; result: number; progress: string }> = ({
    showResult,
    result,
    progress,
}) => {
    const quizAgain = () => {
        window.location.href = "/quizForOne/1";
    };

    const exit = () => {
        window.location.href = "/";
    };

    return (
        <div className={css.quizMain}>
            {showResult && (
                <div className={css.quizContainer}>
                    <h2>Spielende</h2>
                    <div className={css.result}>
                        <p className={css.points}>
                            Sein Punktestand : <span>{result}</span>
                        </p>
                        <p className={css.resultComment}>
                            {getMessage("result", result)}
                        </p>
                        <p className={css.resultComparison}>
                            {getMessage("progress", progress)}
                        </p>
                        <div className={css.buttonBox}>
                            <button onClick={quizAgain} className={css.buttonStart}>
                                Noch einmal
                            </button>
                            <button onClick={exit} className={css.buttonExit}>
                                Beenden
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { Result };
