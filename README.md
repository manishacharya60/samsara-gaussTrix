# GaussTrix - The Ultimate Math Trivia Game

GaussTrix is a thrilling two-player math trivia game that challenges your knowledge of mathematics, mathematicians, and their groundbreaking discoveries. Compete with your friends to see who can reach 100 points first by answering questions about the fascinating world of math!

## Game Objective

The goal of GaussTrix is simple: be the first player to score 100 points by answering math-related trivia questions correctly.

## Installation

Follow these instructions to install and run GaussTrix on your system:

1. Clone the project into your system
    ```
    git clone https://github.com/manishacharya60/samsara-gaussTrix.git
    ```
2. If you want to run the `backend` locally, go into the `backend` folder and create a file named `.env`
3. Add the following line in your `.env` file:
    ```
    OPENAI_API_KEY=<Your OpenAI API Key Here>
    ```
5. Then, run the following command. 
    ```
    $ node .
    ```
    By default, the backend runs on [http://localhost:8080](http://localhost:8080)
6. Then, go back to the `frontend` folder and run the following commands
    ```
    $ npm install
    ```
7. Finally, run the following command
    ```
    $ npm start
    ```
    By default, the frontend runs on [http://localhost:3000](http://localhost:3000)

## Game Features

1. **Two-Player Gameplay:** Engage in a head-to-head trivia battle with a friend.
2. **Diverse Questions:** Explore questions covering mathematicians' lives, discoveries, and intriguing math facts.
3. **Timed Challenges:** Each player has 30 seconds to answer each question, adding a layer of excitement and pressure.
4. **Scoring System:** Earn 10 points for each correct answer. The first player to reach 100 points wins the game.
5. **Strategic Play:** Incorrect answers pass the question to the other player, making every move critical.

## How to Play

1. **Turn-Based Play:** Players take turns answering trivia questions. 
2. **Answering Questions:** You have 30 seconds to answer the question presented to you. If you answer incorrectly or run out of time, the question passes to your opponent.
3. **Scoring:** Each correct answer earns you 10 points. Keep playing until one player reaches or exceeds 100 points.
4. **Winning:** The game ends immediately when a player reaches 100 points, crowning them the GaussTrix champion.

## Contribution

If you want to contribute to GaussTrix, feel free to fork the repository, create a new branch, and submit a pull request. We're open to improvements, new features, and bug fixes.
