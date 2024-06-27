import React, { FC } from "react";

import css from "../StartForFirst/StartForFirst.module.css";
const StartForSecond: FC<{
  partner: string | null;
  setStartSecond: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
}> = ({ partner, setStartSecond, setActiveQuestion }) => {
    const cleanStrUser = partner?.replace(/"/g, "");
    const startSecond = () => {
        setStartSecond(true);
        setActiveQuestion(0);
    };
    const exit = () => {
        window.location.href = "/";
    };

    return (
        <div className={css.startFirstMain}>
            <div className={css.startFirstBox}>
                <div className={css.borderStartFirst}>
                    <p className={css.title}>
            Jetzt fangen Sie an, <span>{cleanStrUser}</span>
                    </p>
                    <p className={css.title}>Sind Sie bereit ?</p>
                    <button onClick={startSecond} className={css.buttonStart}>
            Start
                    </button>
                    <button onClick={exit} className={css.buttonExit}>
            Beenden
                    </button>
                </div>
            </div>
        </div>
    );
};

export { StartForSecond };
