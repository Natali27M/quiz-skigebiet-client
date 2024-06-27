import data from "../data/answers";
import { Data } from "../interfaces";
export default function filterQuestionsForPartner() {
    // We retrieve data about used questions from local storage
    const getDataFromLocalStoragePartner = (): number[] => {
        const partnerQuestions = localStorage.getItem("partnerQuestions");
        return partnerQuestions ? JSON.parse(partnerQuestions) : [];
    };

    const usedQuestionsPartner: number[] = getDataFromLocalStoragePartner();
    let changeLocalStoragePartner = false;

    const getRandomQuestionsPartner = (): {
    randomQuestionsPartner: Data[];
    changeLocalStoragePartner: boolean;
  } => {
        // We filter questions that the user has not yet answered
        const unusedQuestionsPartner: Data[] = data.filter(
            (q) => !usedQuestionsPartner.includes(q.id),
        );
        const randomQuestionsPartner: Data[] = [];

        // We randomly select questions from those that the user has not yet answered.
        // If the number of unused questions is greater than 10, then we select from them
        if (unusedQuestionsPartner.length >= 10) {
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(
                    Math.random() * unusedQuestionsPartner.length,
                );
                randomQuestionsPartner.push(unusedQuestionsPartner[randomIndex]);
                unusedQuestionsPartner.splice(randomIndex, 1);
            }
            // If there are fewer than 10 unused questions, we first randomly select from the questions the user has
            // not yet seen, and then fill in with random questions from those the user has already answered
        } else if (unusedQuestionsPartner.length > 0) {
            while (unusedQuestionsPartner.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * unusedQuestionsPartner.length,
                );
                randomQuestionsPartner.push(unusedQuestionsPartner[randomIndex]);
                unusedQuestionsPartner.splice(randomIndex, 1);
            }

            const remainingCount = 10 - randomQuestionsPartner.length;
            const availableQuestions: Data[] = data.filter(
                (q) => !randomQuestionsPartner.includes(q),
            );
            for (let i = 0; i < remainingCount; i++) {
                const randomIndex = Math.floor(
                    Math.random() * availableQuestions.length,
                );
                randomQuestionsPartner.push(availableQuestions[randomIndex]);
                availableQuestions.splice(randomIndex, 1);
            }
            // If there are no unused questions, then we start again by randomly selecting questions from the beginning
        } else {
            const availableQuestions: Data[] = [...data];
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(
                    Math.random() * availableQuestions.length,
                );
                randomQuestionsPartner.push(availableQuestions[randomIndex]);
                availableQuestions.splice(randomIndex, 1);
            }
            changeLocalStoragePartner = true;
        }

        return {
            randomQuestionsPartner,
            changeLocalStoragePartner,
        };
    };

    return getRandomQuestionsPartner();
}

