import React, { useState } from "react";

import css from "./HomePage.module.css";
import { Header } from "../../components";

const HomePage = () => {
    const [changeStyle, setChangeStyle] = useState <boolean>(false);
    const startQuiz = () => {
        setChangeStyle(true);
    };
    const playOne = () => {
        window.location.pathname = "/quizForOne/1";
    };

    const playTwo = () => {
        window.location.pathname = "/quizForOne/2";
    };
    return (
        <div className={css.main}>
            <Header />
            {!changeStyle ? (
                <div className={css.mainContent}>
                    <div className={css.startMainContent}>
                        <h2>Wissentest</h2>
                        <p>
              Glaubst du, alles über Skigebiete zu wiessen?
                            <br />
              Test dein Wiessen jetzt!
                        </p>
                        <button className={css.buttonContent} onClick={startQuiz}>
              Quiz starten
                        </button>
                    </div>
                </div>
            ) : (
                <div className={css.mainChoice}>
                    <div className={css.startMainChoice}>
                        <div className={css.borderChoice}>
                            <button className={css.buttonChoice} onClick={playOne}>
                Alleine spielen
                            </button>
                            <button className={css.buttonChoice} onClick={playTwo}>
                Zu zweit spielen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { HomePage };
