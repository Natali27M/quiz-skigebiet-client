import React, { FC } from "react";

import css from "./StartForFirst.module.css";
const StartForFirst: FC<{ user: string | null; setStart: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    user,
    setStart,
}) => {
    const cleanStrUser = user?.replace(/"/g, "");
    const startFirst = () => {
        setStart(true);
    };
    const exit = () => {
        window.location.href = "/";
    };
    return (
        <div className={css.startFirstMain}>
            <div className={css.startFirstBox}>
                <div className={css.borderStartFirst}>
                    <p className={css.title}>
                        <span>{cleanStrUser}</span> beginst als Erste
                    </p>
                    <p className={css.title}>Sind Sie bereit ?</p>
                    <button onClick={startFirst} className={css.buttonStart}>
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

export { StartForFirst };
