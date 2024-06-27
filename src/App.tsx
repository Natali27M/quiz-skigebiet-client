import React from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage, QuizPage } from "./pages";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={"/quizForOne/:players"} element={<QuizPage />} />
                <Route path={"/"} element={<HomePage />} />
            </Routes>
        </div>
    );
};

export default App;
