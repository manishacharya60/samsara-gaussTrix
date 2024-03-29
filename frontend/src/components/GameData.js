import React from "react";

const GameData = ({ currentQuestion, handleAnswer }) => {
    return (
        <div className="game-data">
            <div className="game-question">
                <h3>{currentQuestion?.question}</h3>
            </div>
            <div className="game-options">
                {currentQuestion?.options.map((option, index) => (
                    <button
                        type="button"
                        className="option-button"
                        key={index}
                        onClick={() => handleAnswer(option)}
                    >
                        <span className="option-text">{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameData;
