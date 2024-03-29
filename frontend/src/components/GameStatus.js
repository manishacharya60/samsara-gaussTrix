// GameStatus.js
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const GameStatus = ({
    currentPlayer,
    playerNames,
    gameStatus,
    isLoading,
    handlePlayerSwitch,
}) => {
    return (
        <div className="game-status">
            <div className="current-player">
                Who is answering? {playerNames[currentPlayer]}
            </div>
            <div className="timer-container">
                <CountdownCircleTimer
                    className="timer"
                    key={currentPlayer}
                    size={70}
                    strokeWidth={6}
                    trailStrokeWidth={6}
                    trailColor="#212121"
                    isPlaying={gameStatus === "ongoing" && !isLoading}
                    duration={30}
                    colors={["#00DFFC", "#FFFF33", "#FF073A", "#FF073A"]}
                    colorsTime={[20, 10, 5, 0]}
                    onComplete={() => {
                        handlePlayerSwitch();
                        return [true, 1000];
                    }}
                >
                    {({ remainingTime }) => <div>{remainingTime}</div>}
                </CountdownCircleTimer>
            </div>
        </div>
    );
};

export default GameStatus;
