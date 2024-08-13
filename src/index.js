const express = require("express");
const dotenv = require("dotenv");
const {PrismaClient} = require("@prisma/client");
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

const corsOption = {
    Credential: true,
    origin: [process.env.DOMAIN]
};

app.use(cors(corsOption));

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

//homepage
app.get("/", (req, res) => {
    res.status(200).send("Welome to Budimansol");
})

//Mendapatkan semua data notes
app.get("/notes", async (req, res) => {
    const notes = await prisma.note.findMany();
    if (notes.length === 0 ){
        return res.status(400).send("Tidak ada Catatan");
    }
    res.status(200).send(notes);
});

//Mendapatkan satu data notes
app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await prisma.note.findUnique({
        where:{
            id
        },
    });

    if(!note){
        return res.status(404).send("Notes tidak ditemukan");
    }
    res.status(200).send(note);
});

//Menambahkan data notes
app.post("/notes", async (req, res) => {
    const newNotesData = req.body;

    const note = await prisma.note.create({
        data:{
            title: newNotesData.title,
            body: newNotesData.body
        },
    });

    res.status(200).json({
        data: note,
        message: "Notes berhasil dibuat",
    });
});

//Menghapus data notes berdasarkan ID
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;

    await prisma.note.delete({
        where: {
            id
        }
    });
    res.status(200).send("Notes berhasil dihapus")
});

//Edit semua field dalam satu data notes
app.put("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const noteData = req.body;

    if (!(noteData.title && noteData.body)){
        return res.status(400).send("Some field Missing");
    }

    const note = await prisma.note.update({
        where:{
            id
        },
        data:{
            title: noteData.title,
            body: noteData.body
        }
    });
    res.status(200).send({
        data: note,
        message: "Edit notes berhasil"
    });
});

//Mengedit satu field saja
app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const noteData = req.body;

    const note = await prisma.note.update({
        where:{
            id
        },
        data:{
            title: noteData.title,
            body: noteData.body
        }
    });
    res.status(200).send({
        data: note,
        message: "Edit notes berhasil"
    });
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});