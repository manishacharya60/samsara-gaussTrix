// FeedbackDisplay.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const FeedbackDisplay = ({ feedback }) => {
    return (
        <div className={`feedback ${feedback}`}>
            {feedback === "correct" ? (
                <>
                    <FontAwesomeIcon icon={faCircleCheck} /> Correct!
                </>
            ) : (
                <>
                    <FontAwesomeIcon icon={faCircleXmark} /> Incorrect!
                </>
            )}
        </div>
    );
};

export default FeedbackDisplay;
