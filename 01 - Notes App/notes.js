const fs = require("fs");
const chalk = require("chalk");

const saveNotes = (notes) => {
  let notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (e) {
    return [];
  }
};

let notes = loadNotes();

const addNote = (title, body) => {
  let note = {
    title: title,
    body: body,
  };
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push(note);
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("note title taken!"));
  }
};

const removeNote = (title) => {
  let newNotes = notes.filter((note) => note.title !== title);
  if (notes.length > newNotes.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(newNotes);
  } else {
    console.log(chalk.red.inverse("No note found! or it removed"));
  }
};

const listNotes = () => {
  if (notes.length == 0) {
    console.log(chalk.inverse("no note found add one"));
    return;
  }
  console.log(chalk.inverse("Your notes"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
  });
};
const readNote = (title) => {
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log("title: " + chalk.blue.inverse(note.title));
    console.log("body: " + chalk.blue(note.body));
  } else {
    console.log(chalk.red.inverse("note not found!"));
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
