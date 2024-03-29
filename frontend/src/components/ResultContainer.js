import React from "react";

// Import the icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

const ResultContainer = ({ playerNames, currentPlayer, resetGame }) => {
    return (
        <div className="result-container">
            <h2>{playerNames[currentPlayer]} wins!</h2>
            <button onClick={resetGame} className="restart-button">
                <span className="restart-text">Restart Game</span>
                <span className="restart-icon">
                    <FontAwesomeIcon icon={faRepeat} />
                </span>
            </button>
        </div>
    );
};

export default ResultContainer;
