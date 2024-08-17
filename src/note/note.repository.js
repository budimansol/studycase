const prisma = require('../db');

const findNotes = async () => {
    const notes = await prisma.note.findMany()
    return notes;
}

const findNotebyId = async (id) => {
    const note = await prisma.note.findUnique({
        where:{
            id
        },
    });
    return note;
}

const findNotebyName = async (name) => {
    const note = await prisma.note.findUnique({
        where:{
            name
        },
    });
    return note;
}

const createNote = async (newNoteData) => {
    const note = await prisma.note.create({
        data:{
            title: newNoteData.title,
            body: newNoteData.body
        },
    });
    return note;
}

const deleteNotebyId = async (id) =>{
    await prisma.note.delete({
        where: {
            id
        }
    });
}

const editNotebyId = async (id, noteData) => {
    const note = await prisma.note.update({
        where:{
            id
        },
        data:{
            title: noteData.title,
            body: noteData.body
        }
    });
    return note;
}

module.exports = {
    findNotes,
    findNotebyId,
    findNotebyName,
    createNote,
    deleteNotebyId,
    editNotebyId
}