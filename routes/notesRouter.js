const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fileUtils');
const db = './db/db.json';

notes.get('/', (req, res) => {
    readFromFile(db).then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    
    if(req.body){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(db, newNote);
        
        res.json('Successfully added note!');
    } else {
        res.json('Note could not be added.')
    }
})

notes.get('/:id', (req, res) => {
    const note_id = req.params.id;
    readFromFile(db).then((data) => JSON.parse(data))
        .then((rambo) => {
            const noteSelected = rambo.filter((note) => note.id === note_id);
            return noteSelected.length > 0
            ? res.json(noteSelected)
            : res.json('No note matching that ID');
        });
});

notes.delete('/:id', (req, res) => {
    const note_id = req.params.id;
    readFromFile(db).then((data) => JSON.parse(data))
        .then((rambo) => {
            const noteNotSelected = rambo.filter((note) => note.id !== note_id);
            
            writeToFile(db, noteNotSelected);

            res.json('Deleted successfully!');
            
        });
});

module.exports = notes;