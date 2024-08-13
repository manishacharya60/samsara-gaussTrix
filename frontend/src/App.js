import React, { useState, useEffect, useRef, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";

// Import the custom CSS file
import "./css/App.css";
import "./css/Loader.css";
import "./css/PlayerContainer.css";

// Import the icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlay,
    faHandshakeAngle,
} from "@fortawesome/free-solid-svg-icons";

// Import the custom components
import GameData from "./components/GameData";
import GameStatus from "./components/GameStatus";
import LoaderContainer from "./components/Loader";
import GameRulesModal from "./components/GameRulesModal";
import PlayerContainer from "./components/PlayerContainer";
import ResultContainer from "./components/ResultContainer";
import FeedbackDisplay from "./components/FeedbackDisplay";
import { parseQuestionFromResponse } from "./utils/apiResponseParser";

// Define the initial scores, winning score, and points per correct answer
const initialScores = { player1: 0, player2: 0 };
const winningScore = 100;
const pointsPerCorrectAnswer = 10;

// Define the player names
const playerNames = {
    player1: "EinsTime",
    player2: "GaussGuru",
};

function App() {
    // States to manage the game logic
    const feedbackTimeout = useRef(null);
    const [show, setShow] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const [scores, setScores] = useState(initialScores);
    const [gameStatus, setGameStatus] = useState("notStarted");
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("player1");

    // Modal functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePlayerSwitch = useCallback(() => {
        setCurrentPlayer((currentPlayer) =>
            currentPlayer === "player1" ? "player2" : "player1"
        );
        setTimeLeft(30); // Reset the timer for the next player
    }, [setCurrentPlayer, setTimeLeft]);

    // Fetch the question when the game starts
    useEffect(() => {
        fetchQuestion();
    }, []);

    // useEffect(() => {
    //     console.log(currentQuestion);
    // }, [currentQuestion]);

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0 && gameStatus === "ongoing") {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else if (timeLeft === 0) {
            handlePlayerSwitch();
        }
    }, [timeLeft, gameStatus, handlePlayerSwitch]);

    // Start the game
    const startGame = () => {
        setGameStatus("ongoing");
        fetchQuestion();
    };

    // Reset the game
    const resetGame = () => {
        setScores(initialScores);
        setCurrentPlayer("player1");
        setGameStatus("ongoing");
        setFeedback("");
        fetchQuestion(); // Fetch a new question to start the game
    };

    // Fetch the question from the server
    const fetchQuestion = () => {
        setIsLoading(true);
        fetch("http://localhost:8080/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                parseQuestionFromResponse(
                    data,
                    setCurrentQuestion,
                    setFeedback
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching question:", error);
                setFeedback("Failed to fetch the question. Please try again.");
                setIsLoading(false);
            });
        setTimeLeft(30); // Reset the timer when fetching a new question
    };

    // Handle the answer selection
    const handleAnswer = (option) => {
        if (!currentQuestion || gameStatus !== "ongoing") return;

        const isCorrect = option === currentQuestion.correctAnswer;

        // Reset feedbackType to force a re-render even if the next feedback is the same
        setFeedback(null);

        // Use a slight delay to reset and then set the feedback type to ensure the component updates
        setTimeout(() => {
            setFeedback(isCorrect ? "correct" : "incorrect");

            // Clear any existing timeout to ensure we don't have multiple timeouts running
            clearTimeout(feedbackTimeout.current);

            // Set a timeout to clear the feedbackType after displaying the message
            feedbackTimeout.current = setTimeout(() => {
                setFeedback(null);
                if (
                    !isCorrect ||
                    scores[currentPlayer] + pointsPerCorrectAnswer <
                        winningScore
                ) {
                    handlePlayerSwitch();
                }
            }, 2000);
        }, 0);

        if (isCorrect) {
            setScores((prevScores) => ({
                ...prevScores,
                [currentPlayer]:
                    prevScores[currentPlayer] + pointsPerCorrectAnswer,
            }));

            if (
                scores[currentPlayer] + pointsPerCorrectAnswer >=
                winningScore
            ) {
                setGameStatus("won");
                clearTimeout(feedbackTimeout.current); // Clear the timeout when the game is won
            }
        }

        // Fetch a new question immediately for the correct answer,
        // for the incorrect answer, the switch happens after the feedback duration
        if (
            isCorrect &&
            scores[currentPlayer] + pointsPerCorrectAnswer < winningScore
        ) {
            setTimeout(fetchQuestion, 2000);
        }
    };

    return (
        <div className="App">
            <GameRulesModal show={show} handleClose={handleClose} />
            <Container>
                <Row>
                    <Col
                        xs
                        lg={{ span: 8, offset: 2 }}
                        md={{ span: 8, offset: 2 }}
                    >
                        <div className="game-container">
                            <PlayerContainer scores={scores} />
                            {gameStatus === "notStarted" ? (
                                <div className="game-menu">
                                    <h1 className="game-title">
                                        Welcome to GaussTrix!
                                    </h1>
                                    <div className="versus-container">
                                        <span className="player-name eins-time">
                                            EinsTime
                                        </span>
                                        <span className="vs-text">vs</span>
                                        <span className="player-name gauss-guru">
                                            GaussGuru
                                        </span>
                                    </div>

                                    <div className="game-menu-buttons">
                                        <button
                                            className="restart-button"
                                            onClick={startGame}
                                        >
                                            <span className="restart-text">
                                                Start Game
                                            </span>
                                            <span className="restart-icon">
                                                <FontAwesomeIcon
                                                    icon={faCirclePlay}
                                                />
                                            </span>
                                        </button>
                                        <button
                                            className="restart-button"
                                            onClick={handleShow}
                                        >
                                            <span className="restart-text">
                                                Game Rules
                                            </span>
                                            <span className="restart-icon">
                                                <FontAwesomeIcon
                                                    icon={faHandshakeAngle}
                                                />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {gameStatus === "won" ? (
                                        <ResultContainer
                                            playerNames={playerNames}
                                            currentPlayer={currentPlayer}
                                            resetGame={resetGame}
                                        />
                                    ) : isLoading ? (
                                        <LoaderContainer />
                                    ) : (
                                        <>
                                            <GameStatus
                                                currentPlayer={currentPlayer}
                                                playerNames={playerNames}
                                                gameStatus={gameStatus}
                                                isLoading={isLoading}
                                                handlePlayerSwitch={
                                                    handlePlayerSwitch
                                                }
                                            />
                                            <GameData
                                                currentQuestion={
                                                    currentQuestion
                                                }
                                                handleAnswer={handleAnswer}
                                            />
                                            {feedback && (
                                                <FeedbackDisplay
                                                    feedback={feedback}
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
