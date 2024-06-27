import React, { FC } from "react";

import { progressMessages, resultMessages } from "../../../data";
import css from "../../Result/Result.module.css";
import thisCss from "../ResultFirstPlayer/ResultFirstPlayer.module.css";

const getMessage = (type: "result" | "progress", key: number | string): string => {
    if (type === "result") {
        return resultMessages[key as number] || resultMessages[0];
    }
    if (type === "progress") {
        return progressMessages[key as string] || progressMessages["default"];
    }
    return "";
};

const ResultSecondPlayer: FC<{
    resultPartner: number;
    progressPartner: string;
    winner: string;
    winnerResult: number;
    loserResult: number;
}> = ({
    resultPartner,
    progressPartner,
    winner,
    winnerResult,
    loserResult,
}) => {
    const quizAgain = () => {
        window.location.href = "/quizForOne/2";
    };
    const exit = () => {
        window.location.href = "/";
    };

    return (
        <div className={css.quizContainer}>
            <h2>Spielende</h2>
            <div className={css.result}>
                <p className={thisCss.points}>
                    Sein Punktestand : <span>{resultPartner}</span>
                </p>
                <p className={thisCss.resultComment}>
                    {getMessage("result", resultPartner)}
                </p>
                <p className={thisCss.resultComparison}>
                    {getMessage("progress", progressPartner)}
                </p>
                <p className={thisCss.partner}>
                    {winner} hat mit {winnerResult} : {loserResult} gewonnen.
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
    );
};

export { ResultSecondPlayer };
