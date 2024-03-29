const parseQuestionFromResponse = (data, setCurrentQuestion, setFeedback) => {
    const questionMatch = data.match(
        /\*\*Question:\*\*\s*([^\*]+?)\s*\*\*Options:/
    );
    const question = questionMatch ? questionMatch[1].trim() : "";

    const optionsMatch = data.match(/\*\*Options:\*\*\s*(.+?)\s*\*\*Correct:/);
    const optionsText = optionsMatch ? optionsMatch[1].trim() : "";
    const options = optionsText
        .split(/\s*(?=[A-D]\))\s*/)
        .map((opt) => opt.trim());

    const correctMatch = data.match(/\*\*Correct:\*\*\s*(.+)/);
    const correct = correctMatch ? correctMatch[1].trim() : "";

    setCurrentQuestion({
        question,
        options,
        correctAnswer: correct,
    });
    setFeedback("");
};

export { parseQuestionFromResponse };
