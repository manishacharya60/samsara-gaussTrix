const PORT = 8080; // Uncomment this line to run the server locally
const cors = require("cors");
const express = require("express");
const { OpenAI } = require("openai");
// const serverlessHttp = require("serverless-http");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
    dangerouslyAllowBrowser: true, // Uncomment this line to enable the API for browser use
});

// Get the coding interview question from the OpenAI API
app.get("/", async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "Generate a high school level trivia question related to a mathematician's life, facts, biography, discoveries, or contributions. The topic should be randomly selected from these categories for each question. Provide four options for answers, with only one correct answer. Clearly indicate which one is correct.\nRandomly choose one topic for each question: 1. Life events or personal facts about the mathematician 2. Biography highlights 3. Major discoveries or theories 4. Key contributions to mathematics or related fields.\n Example question and answer format(Strictly adhere to this format and only give me this in the response. Please do not add new lines or more whitespace while generating the response.): **Question:** Who is known as the father of geometry? **Options:** A) Isaac Newton B) Euclid C) Albert Einstein D) Pythagoras **Correct:** B) Euclid",
                },
                {
                    role: "user",
                    content: "Generate the question",
                },
            ],
        });

        console.log(response.choices[0].message.content);
        res.json(response.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing the OpenAI API request");
    }
});

// Uncomment the following line to run the server locally
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Comment out the following line to run the server locally
// module.exports.handler = serverlessHttp(app);
