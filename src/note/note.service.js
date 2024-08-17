const prisma = require('../db');
const { findNotes, findNotebyId, findNotebyName } = require('./note.repository');

const getAllNotes = async () => {
    const notes = await findNotes();
    if (notes.length === 0 ){
        throw Error ("Tidak ada Catatan");
    }
    return notes;
}

const getNotebyId = async (id) => {
    const note = await findNotebyId(id);

    if(!note){
        throw Error("Notes tidak ditemukan");
    }

    return note;
}

const createNote = async (newNoteData) => {
    const findName = await findNotebyName(newNoteData.name);
    if (findName){
        throw new Error ("Nama Note sudah ada");
    }

    const note = await createNote(newNoteData);

    return note;
}

const deleteNotebyId = async (id) => {
    
    await getNotebyId(id); 
    await deleteNotebyId(id);
}

const editNotebyId = async (id, noteData) => {
    await getNotebyId(id);

    const note = await editNotebyId(id, noteData)
    return note;
}

module.exports = {
    getAllNotes,
    getNotebyId,
    createNote,
    deleteNotebyId,
    editNotebyId,

}