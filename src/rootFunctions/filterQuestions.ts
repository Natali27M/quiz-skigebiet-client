import data from "../data/answers";
import { Data } from "../interfaces";
export default function filterQuestions() {
    // We retrieve data about used questions from local storage
    const getDataFromLocalStorage = (): number[] => {
        const usedQuestions = localStorage.getItem("usedQuestions");
        return usedQuestions ? JSON.parse(usedQuestions) : [];
    };

    const usedQuestions: number[] = getDataFromLocalStorage();
    let changeLocalStorage = false;

    const getRandomQuestions = (): {
    randomQuestions: Data[];
    changeLocalStorage: boolean;
  } => {

        // We filter questions that the user has not yet answered
        const unusedQuestions: Data[] = data.filter(
            (q) => !usedQuestions.includes(q.id),
        );
        const randomQuestions: Data[] = [];

        // We randomly select questions from those that the user has not yet answered.
        // If the number of unused questions is greater than 10, then we select from them
        if (unusedQuestions.length >= 10) {
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
                randomQuestions.push(unusedQuestions[randomIndex]);
                unusedQuestions.splice(randomIndex, 1);
            }
            // If there are fewer than 10 unused questions, we first randomly select from the questions the user has
            // not yet seen, and then fill in with random questions from those the user has already answered
        } else if (unusedQuestions.length > 0) {
            while (unusedQuestions.length > 0) {
                const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
                randomQuestions.push(unusedQuestions[randomIndex]);
                unusedQuestions.splice(randomIndex, 1);
            }

            const remainingCount = 10 - randomQuestions.length;
            const availableQuestions: Data[] = data.filter(
                (q) => !randomQuestions.includes(q),
            );
            for (let i = 0; i < remainingCount; i++) {
                const randomIndex = Math.floor(
                    Math.random() * availableQuestions.length,
                );
                randomQuestions.push(availableQuestions[randomIndex]);
                availableQuestions.splice(randomIndex, 1);
            }
            // If there are no unused questions, then we start again by randomly selecting questions from the beginning
        } else {
            const availableQuestions: Data[] = [...data];
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(
                    Math.random() * availableQuestions.length,
                );
                randomQuestions.push(availableQuestions[randomIndex]);
                availableQuestions.splice(randomIndex, 1);
            }
            changeLocalStorage = true;
        }

        return {
            randomQuestions,
            changeLocalStorage,
        };
    };

    return getRandomQuestions();
}

