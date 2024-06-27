import React, { FC, useState } from "react";

import { RegistrationPartner } from "../RegistrationPartner/RegistrationPartner";
import css from "../StartForFirst/StartForFirst.module.css";
const StartForSecondLogin: FC<{
  setStartSecond: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  setPartnerName: React.Dispatch<React.SetStateAction<string>>;
  setShowNameSecondPlayer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    setStartSecond,
    setActiveQuestion,
    setPartnerName,
    setShowNameSecondPlayer,
}) => {
    const partner = localStorage.getItem("partner");
    const partnerParse = partner ? JSON.parse(partner) : "";
    const cleanStrPartner = partnerParse?.replace(/"/g, "");

    const [deletePartner, setDeletePartner] = useState(false);
    const startSecond = () => {
        setStartSecond(true);
        setActiveQuestion(0);
    };
    const changePartner = () => {
        localStorage.removeItem("partner");
        localStorage.removeItem("partnerQuestions");
        localStorage.removeItem("partnerResult");
        setDeletePartner(true);
    };
    const exit = () => {
        window.location.href = "/";
    };

    return (
        <div>
            {partnerParse ? (
                !deletePartner ? (
                    <div className={css.startFirstMain}>
                        <div className={css.startFirstBox}>
                            <div className={css.borderStartFirst}>
                                <p className={css.title}>
                  Jetzt fangen Sie an, <span>{cleanStrPartner}</span>
                                </p>
                                <p className={css.title}>Sind Sie bereit ?</p>
                                <button onClick={startSecond} className={css.buttonStart}>
                  Start
                                </button>
                                <button onClick={changePartner} className={css.buttonStart}>
                  Den Partner wechseln
                                </button>
                                <button onClick={exit} className={css.buttonExit}>
                  Beenden
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <RegistrationPartner
                        setPartnerName={setPartnerName}
                        setShowNameSecondPlayer={setShowNameSecondPlayer}
                    />
                )
            ) : (
                <RegistrationPartner
                    setPartnerName={setPartnerName}
                    setShowNameSecondPlayer={setShowNameSecondPlayer}
                />
            )}
        </div>
    );
};

export { StartForSecondLogin };
