const express = require('express');
const prisma = require('../db');
const { getAllNotes, getNotebyId, createNote, deleteNotebyId, editNotebyId } = require('./note.service');

const router = express.Router();

//Mendapatkan semua data notes
router.get("/", async (req, res) => {
    try {
        const notes = await getAllNotes();
        res.status(200).send(notes);
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

//Mendapatkan satu data notes
router.get("/:id", async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = getNotebyId(noteId);
    
        res.status(200).send(note);
    } catch (err) {
        res.status(400).send(err.message);
    }

});

//Menambahkan data notes
router.post("/", async (req, res) => {
    try {
        const newNoteData = req.body;

        const note = await createNote(newNoteData);

        res.status(200).json({
            data: note,
            message: "Notes berhasil dibuat",
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//Menghapus data notes berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        const noteId = req.params.id;

        await deleteNotebyId(noteId)
        res.status(200).send("Notes berhasil dihapus")
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//Edit semua field dalam satu data notes
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const noteData = req.body;

    if (!(noteData.title && noteData.body)){
        return res.status(400).send("Some field Missing");
    }

    const note = await editNotebyId(id, noteData);
    
    res.status(200).send({
        data: note,
        message: "Edit notes berhasil"
    });
});

//Mengedit satu field saja
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const noteData = req.body;

        const note = await editNotebyId(id, noteData);
        res.status(200).send({
            data: note,
            message: "Edit notes berhasil"
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;