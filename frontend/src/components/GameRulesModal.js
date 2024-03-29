// GameRulesModal.js
import React from "react";
import { Modal } from "react-bootstrap";

const GameRulesModal = ({ show, handleClose }) => {
    return (
        <Modal
            className="game-rules"
            show={show}
            onHide={handleClose}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>GaussTrix Game Rules</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Welcome to GaussTrix, the exciting math trivia game that
                    explores the fascinating world of mathematicians, their
                    lives, discoveries, and mathematical concepts!
                </p>
                <ol>
                    <li>
                        <strong>Objective:</strong> The aim is to score 100
                        points by answering trivia questions about mathematics
                        and mathematicians correctly. Each question delves into
                        historical figures, significant discoveries, and
                        intriguing math facts.
                    </li>
                    <li>
                        <strong>Players:</strong> GaussTrix is a two-player
                        game. Players take turns to tackle questions,
                        challenging each other's math knowledge and strategic
                        thinking.
                    </li>
                    <li>
                        <strong>Answering Questions:</strong> On your turn, a
                        math-related question will appear. You have 30 seconds
                        to answer. If you answer incorrectly, the same question
                        is passed to the next player for a chance to answer and
                        earn points.
                    </li>
                    <li>
                        <strong>Time Limit:</strong> Each player has 30 seconds
                        to answer each question. If the time runs out before an
                        answer is given, the turn automatically passes to the
                        opposing player, and the question remains active.
                    </li>
                    <li>
                        <strong>Scoring:</strong> Every correct answer earns the
                        player 10 points. The points accumulate over the game,
                        with each correct answer bringing you closer to the
                        100-point goal.
                    </li>
                    <li>
                        <strong>Winning the Game:</strong> The first player to
                        reach or exceed 100 points wins. The game immediately
                        concludes, and the winning player is celebrated for
                        their math prowess!
                    </li>
                </ol>
                <p>
                    Are you ready to test your knowledge and quick-thinking
                    skills in the world of mathematics? Let the GaussTrix
                    challenge begin!
                </p>
            </Modal.Body>
        </Modal>
    );
};

export default GameRulesModal;
