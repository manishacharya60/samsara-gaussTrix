import { parseQuestionFromResponse } from "../utils/apiResponseParser";

const fetchQuestion = (
    setIsLoading,
    setCurrentQuestion,
    setFeedback,
    setTimeLeft
) => {
    setIsLoading(true);
    fetch("http://localhost:8080/")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            parseQuestionFromResponse(data, setCurrentQuestion, setFeedback);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching question:", error);
            setFeedback("Failed to fetch the question. Please try again.");
            setIsLoading(false);
        });
    setTimeLeft(30); // Reset the timer when fetching a new question
};

export { fetchQuestion };
