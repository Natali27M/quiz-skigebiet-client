import React from "react";

import css from "./Header.module.css";

const Header = () => {
    return (
        <div className={css.main}>
            <div className={css.title}>
                <div className={css.titleSkigebiet}>SKIGEBIET</div>
                <div className={css.titleQuiz}>QUIZ</div>
            </div>
        </div>
    );
};

export { Header };
