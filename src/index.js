const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();

const corsOption = {
    Credential: true,
    origin: ['astonishing-reflection-production.up.railway.app', 'http://localhost:80', 'http://localhost:3000', 'https://notes-msib.vercel.app', 'https://fe-studycase.vercel.app']
};

app.use(cors(corsOption));

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

//homepage
app.get("/", (req, res) => {
    res.status(200).send("Welome to Budimansol");
})

const noteController = require('./note/note.controller');

app.use('/notes', noteController);

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});