import React, { FC } from "react";

import thisCss from "./ResultFirstPlayer.module.css";
import { progressMessages, resultMessages } from "../../../data";
import css from "../../Result/Result.module.css";
const getMessage = (type: "result" | "progress", key: number | string): string => {
    if (type === "result") {
        return resultMessages[key as number] || resultMessages[0];
    }
    if (type === "progress") {
        return progressMessages[key as string] || progressMessages["default"];
    }
    return "";
};

const ResultFirstPlayer: FC<{
    showResult: boolean;
    result: number;
    progress: string;
    setGameForTwo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showResult, result, progress, setGameForTwo }) => {
    const startSecondPlayer = () => {
        setGameForTwo(true);
    };

    const exit = () => {
        window.location.href = "/";
    };

    return (
        <div>
            <div className={css.quizMain}>
                {showResult && (
                    <div className={css.quizContainer}>
                        <h2>Spielende</h2>
                        <div className={css.result}>
                            <p className={thisCss.points}>
                                Sein Punktestand : <span>{result}</span>
                            </p>
                            <p className={thisCss.resultComment}>
                                {getMessage("result", result)}
                            </p>
                            <p className={thisCss.resultComparison}>
                                {getMessage("progress", progress)}
                            </p>
                            <p className={thisCss.partner}>
                                Jetzt ist Ihr Partner dran. Bereit?
                            </p>
                            <div className={css.buttonBox}>
                                <button onClick={startSecondPlayer} className={css.buttonStart}>
                                    Start
                                </button>
                                <button onClick={exit} className={css.buttonExit}>
                                    Beenden
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ResultFirstPlayer };
