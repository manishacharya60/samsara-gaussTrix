import React from "react";

import einstein from "../assets/einstein.png";
import gaussGuru from "../assets/gauss.png";

const PlayerContainer = ({ scores }) => {
    return (
        <div className="player-container">
            <div className="first-player">
                <div className="first-player-avatar">
                    <img src={einstein} alt="EinsTime" />
                </div>
                {scores.player1}
            </div>
            <div className="second-player">
                <div className="second-player-avatar">
                    <img src={gaussGuru} alt="GaussGuru" />
                </div>
                {scores.player2}
            </div>
        </div>
    );
};

export default PlayerContainer;
