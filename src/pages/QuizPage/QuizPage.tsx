import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import css from "./QuizPage.module.css";
import {
    Header,
    Questions,
    QuestionsPartner,
    Registration,
    RegistrationPartner,
    Result,
    ResultFirstPlayer,
    ResultSecondPlayer,
    StartForFirst,
    StartForSecond,
    StartForSecondLogin,
} from "../../components";
import { Data } from "../../interfaces";
import filterQuestionsForPartner from "../../rootFunctions/filterQuestionForPartner";
import filterQuestions from "../../rootFunctions/filterQuestions";

const QuizPage: FC = () => {
    const { players } = useParams();

    // Data for user
    const functionFilterQuestions: { randomQuestions: Data[], changeLocalStorage: boolean} = useMemo(() => filterQuestions(), []);
    const myData: Data[] = functionFilterQuestions.randomQuestions;
    const [questionColors, setQuestionColors] = useState<{
        [key: number]: string;
    }>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
        null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [numberQuestion, setNumberQuestion] = useState<number>(0);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [processingAnswer, setProcessingAnswer] = useState<boolean>(false);
    const [progress, setProgress] = useState<string>("");
    const [result, setResult] = useState<{
        correctAnswers: number, wrongAnswers: number
        }>({
            correctAnswers: 0,
            wrongAnswers: 0,
        });
    const [userName, setUserName] = useState<string>("");
    const user = localStorage.getItem("user");
    const userParse = user ? JSON.parse(user) : "";
    const existingMyResult = localStorage.getItem("myResult");
    const myResult = existingMyResult ? JSON.parse(existingMyResult) : 0;
    const usedQuestions: number[] = [];
    myData.map((item) => usedQuestions.push(item.id));
    const addLeadingZero = (number: number) => (number > 10 ? number : number);

    // Data for partner
    const functionFilterQuestionsForPartner: { randomQuestionsPartner: Data[], changeLocalStoragePartner: boolean} = useMemo(
        () => filterQuestionsForPartner(),
        [],
    );
    const partnerData: Data[] =
    functionFilterQuestionsForPartner.randomQuestionsPartner;
    const [questionColorsPartner, setQuestionColorsPartner] = useState<{
    [key: number]: string;
  }>({});
    const [selectedAnswerPartner, setSelectedAnswerPartner] = useState<
    string | null
  >(null);
    const [isCorrectPartner, setIsCorrectPartner] = useState<boolean | null>(
        null);
    const [numberQuestionPartner, setNumberQuestionPartner] = useState<number>(
        0);
    const [activeQuestionPartner, setActiveQuestionPartner] = useState<number>(
        0);
    const [processingAnswerPartner, setProcessingAnswerPartner] = useState<boolean>(false);
    const [progressPartner, setProgressPartner] = useState("");
    const [resultPartner, setResultPartner] = useState<{
        correctAnswersPartner: number, wrongAnswersPartner: number
    }>({
        correctAnswersPartner: 0,
        wrongAnswersPartner: 0,
    });
    const partner = localStorage.getItem("partner");
    const partnerParse = partner ? JSON.parse(partner) : "";
    const existingPartnerResult = localStorage.getItem("partnerResult");
    const partnerResult = existingPartnerResult
        ? JSON.parse(existingPartnerResult)
        : 0;
    const usedQuestionsPartner: number[] = [];
    partnerData.map((item) => usedQuestionsPartner.push(item.id));
    const addLeadingZeroPartner = (number: number) =>
        number > 10 ? number : number;

    // Data for the game for both players
    const [startGameForTwo, setGameForTwo] = useState<boolean>(false);
    const [startFirst, setStartFirst] = useState<boolean>(false);
    const [startSecond, setStartSecond] = useState<boolean>(false);
    const [showNameSecondPlayer, setShowNameSecondPlayer] = useState<boolean>(
        false);
    const [partnerName, setPartnerName] = useState<string>("");
    const [winner, setWinner] = useState<string>("");
    const [winnerResult, setWinnerResult] = useState<number>(0);
    const [loserResult, setLoserResult] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const navigate = useNavigate();

    // Processing user data

    // Processing user answer selection
    const onAnswerSelected = (answer: string) => {
        if (processingAnswer) return;
        setProcessingAnswer(true);
        const correctAnswer = myData[numberQuestion].correct;
        setSelectedAnswer(answer);
        const isAnswerCorrect = answer === correctAnswer;
        setIsCorrect(isAnswerCorrect);

        setResult((prev) => ({
            ...prev,
            correctAnswers: isAnswerCorrect
                ? prev.correctAnswers + 1
                : prev.correctAnswers,
            wrongAnswers: !isAnswerCorrect
                ? prev.wrongAnswers + 1
                : prev.wrongAnswers,
        }));

        const newColor = isAnswerCorrect ? "green" : "red";

        setQuestionColors((prevColors) => ({
            ...prevColors,
            [numberQuestion]: newColor,
        }));

        setTimeout(() => {
            setActiveQuestion((prev) => prev + 1);
            setNumberQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setProcessingAnswer(false);
        }, 700);
    };

    // Effect for handling the end of the user's game
    useEffect(() => {
        if (activeQuestion >= 10) {
            const existingUsedQuestions = localStorage.getItem("usedQuestions");
            const myUsedQuestions = existingUsedQuestions
                ? JSON.parse(existingUsedQuestions)
                : [];
            const concatUsedQuestions = myUsedQuestions.concat(usedQuestions);
            const resultQuiz = concatUsedQuestions.reduce((acc: string[], item: string) => {
                if (acc.includes(item)) {
                    return acc;
                }
                return [...acc, item];
            }, []);
            localStorage.setItem("usedQuestions", JSON.stringify(resultQuiz));

            if (existingMyResult) {
                if (myResult < result.correctAnswers) {
                    setProgress("gut");
                } else if (myResult > result.correctAnswers) {
                    setProgress("bad");
                } else {
                    setProgress("neutral");
                }
            } else {
                setProgress("first");
            }

            localStorage.setItem("myResult", JSON.stringify(result.correctAnswers));

            setShowResult(true);
        }
    }, [activeQuestion]);

    useEffect(() => {
        if (functionFilterQuestions.changeLocalStorage) {
            localStorage.removeItem("usedQuestions");
        }
    }, [functionFilterQuestions.changeLocalStorage]);

    const getAnswerClass = (answer: string) => {
        if (selectedAnswer === answer) {
            return isCorrect ? css.correctAnswer : css.incorrectAnswer;
        }
        return css.quizContainer;
    };

    // Data for user's questions component
    const dataQuestions = {
        addLeadingZero,
        activeQuestion,
        questionColors,
        myData,
        numberQuestion,
        onAnswerSelected,
        getAnswerClass,
    };

    // User creation
    useEffect(() => {
        if (userName) {
            localStorage.setItem("user", JSON.stringify(userName));
            navigate(`/quizForOne/${players}`); // Використовуємо navigate замість зміни location
        }
    }, [userName, navigate, players]);



    // Processing partner data

    // Processing partner answer selection
    const onAnswerSelectedPartner = (answer: string) => {
        if (processingAnswerPartner) return;
        setProcessingAnswerPartner(true);
        const correctAnswerPartner = partnerData[numberQuestionPartner].correct;
        setSelectedAnswerPartner(answer);
        const isAnswerCorrectPartner = answer === correctAnswerPartner;
        setIsCorrectPartner(isAnswerCorrectPartner);

        setResultPartner((prev) => ({
            ...prev,
            correctAnswersPartner: isAnswerCorrectPartner
                ? prev.correctAnswersPartner + 1
                : prev.correctAnswersPartner,
            wrongAnswersPartner: !isAnswerCorrectPartner
                ? prev.wrongAnswersPartner + 1
                : prev.wrongAnswersPartner,
        }));

        const newColorPartner = isAnswerCorrectPartner ? "green" : "red";

        setQuestionColorsPartner((prevColors) => ({
            ...prevColors,
            [numberQuestionPartner]: newColorPartner,
        }));

        setTimeout(() => {
            setActiveQuestionPartner((prev) => prev + 1);
            setNumberQuestionPartner((prev) => prev + 1);
            setSelectedAnswerPartner(null);
            setIsCorrectPartner(null);
            setProcessingAnswerPartner(false);
        }, 700);
    };

    // Effect for handling the end of the partner's game
    useEffect(() => {
        if (activeQuestionPartner >= 10) {
            const existingUsedQuestionsPartner =
        localStorage.getItem("partnerQuestions");
            const partnerUsedQuestions = existingUsedQuestionsPartner
                ? JSON.parse(existingUsedQuestionsPartner)
                : [];
            const concatUsedQuestionsPartner =
        partnerUsedQuestions.concat(usedQuestionsPartner);
            const resultQuizPartner = concatUsedQuestionsPartner.reduce(
                (acc: string[], item: string) => {
                    if (acc.includes(item)) {
                        return acc;
                    }
                    return [...acc, item];
                },
                [],
            );
            localStorage.setItem(
                "partnerQuestions",
                JSON.stringify(resultQuizPartner),
            );

            if (functionFilterQuestionsForPartner.changeLocalStoragePartner) {
                localStorage.removeItem("partnerQuestions");
            }

            if (existingPartnerResult) {
                if (partnerResult < resultPartner.correctAnswersPartner) {
                    setProgressPartner("gut");
                } else if (partnerResult > resultPartner.correctAnswersPartner) {
                    setProgressPartner("bad");
                } else {
                    setProgressPartner("neutral");
                }
            } else {
                setProgressPartner("first");
            }

            localStorage.setItem(
                "partnerResult",
                JSON.stringify(resultPartner.correctAnswersPartner),
            );
        }
    }, [activeQuestionPartner]);

    useEffect(() => {
        if (functionFilterQuestionsForPartner.changeLocalStoragePartner) {
            localStorage.removeItem("partnerQuestions");
        }
    }, [functionFilterQuestionsForPartner.changeLocalStoragePartner]);

    const getAnswerClassPartner = (answer: string) => {
        if (selectedAnswerPartner === answer) {
            return isCorrectPartner ? css.correctAnswer : css.incorrectAnswer;
        }
        return css.quizContainer;
    };

    // Data for partner's questions component
    const dataQuestionsPartner = {
        addLeadingZeroPartner,
        activeQuestionPartner,
        questionColorsPartner,
        partnerData,
        numberQuestionPartner,
        onAnswerSelectedPartner,
        getAnswerClassPartner,
    };

    // Partner creation
    useEffect(() => {
        if (partnerName) {
            localStorage.setItem("partner", JSON.stringify(partnerName));
            navigate(`/quizForOne/${players}`);
        }
    }, [partnerName, navigate, players]);

    useEffect(() => {
        if (result.correctAnswers > resultPartner.correctAnswersPartner) {
            setWinner(userParse);
            setWinnerResult(result.correctAnswers);
            setLoserResult(resultPartner.correctAnswersPartner);
        } else if (result.correctAnswers < resultPartner.correctAnswersPartner) {
            setWinner(partnerParse);
            setWinnerResult(resultPartner.correctAnswersPartner);
            setLoserResult(result.correctAnswers);
        } else {
            setWinner("Die Freundschaft");
            setWinnerResult(result.correctAnswers);
            setLoserResult(resultPartner.correctAnswersPartner);
        }
    }, [partnerResult]);

    return (
        <div>
            <Header />
            {players === "1" ? (
                userParse ? (
                    myData && activeQuestion < 10 ? (
                        <Questions dataQuestions={dataQuestions} />
                    ) : (
                        <Result
                            showResult={showResult}
                            result={result.correctAnswers}
                            progress={progress}
                        />
                    )
                ) : (
                    <Registration setName={setUserName} />
                )
            ) : (
                <div>
                    {!startGameForTwo ? (
                        !startFirst ? (
                            userParse ? (
                                <StartForFirst user={user} setStart={setStartFirst} />
                            ) : (
                                <Registration setName={setUserName} />
                            )
                        ) : myData && activeQuestion < 10 ? (
                            <Questions dataQuestions={dataQuestions} />
                        ) : (
                            <ResultFirstPlayer
                                showResult={showResult}
                                result={result.correctAnswers}
                                progress={progress}
                                setGameForTwo={setGameForTwo}
                            />
                        )
                    ) : !partnerParse ? (
                        <RegistrationPartner
                            setPartnerName={setPartnerName}
                            setShowNameSecondPlayer={setShowNameSecondPlayer}
                        />
                    ) : !startSecond ? (
                        !showNameSecondPlayer ? (
                            <StartForSecondLogin
                                setStartSecond={setStartSecond}
                                setActiveQuestion={setActiveQuestion}
                                setPartnerName={setPartnerName}
                                setShowNameSecondPlayer={setShowNameSecondPlayer}
                            />
                        ) : (
                            <StartForSecond
                                partner={partner}
                                setStartSecond={setStartSecond}
                                setActiveQuestion={setActiveQuestion}
                            />
                        )
                    ) : partnerData && activeQuestionPartner < 10 ? (
                        <QuestionsPartner dataQuestionsPartner={dataQuestionsPartner} />
                    ) : (
                        <ResultSecondPlayer
                            resultPartner={resultPartner.correctAnswersPartner}
                            progressPartner={progressPartner}
                            winner={winner}
                            winnerResult={winnerResult}
                            loserResult={loserResult}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export { QuizPage };

