const Note = require("../models/note.model");

const express = require("express");
const router = express.Router();
const { validateNoteArray } = require("../utils/validators");

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */

/* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */

router.get("/", async (req, res) => {
  // Made the function async to use await
  console.log(
    `[GET] http://localhost:${global.port}/notes - Fetching all notes`
  );

  try {
    const notes = await Note.find({}); // Fetch all notes from the database

    if (!validateNoteArray(notes)) {
      res.status(500).send("Invalid data type");
      return; // Add return to exit the function to prevent further execution
    }

    // Transforming the data to match the desired output format
    const transformedNotes = notes.map((note) => ({
      id: note._id,
      text: note.content,
      dateCreated: note.createdAt,
      lastModified: note.updatedAt,
    }));

    res.send({ notes: transformedNotes });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Fail to query");
  }
});

// TODO-3.1: Remove this section once you start working on TODO-3
// --- Remove section begins ---
// const notes = [
//   { id: 11, text: 'This is dummy note from fetch all!', dateCreated: '2021-04-15', lastModified: '2021-04-17' },
//   { id: 12, text: 'This is another dummy note from fetch all!', dateCreated: '2021-09-15', lastModified: '2021-10-17' }
// ]
// if (!validateNoteArray(notes)) {
//   res.status(500).send('Invalid data type')
// }
// res.send({ notes })
// --- Remove section ends ---
// })
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get("/search/:searchKey", (req, res) => {
  console.log(
    `[GET] http://localhost:${global.port}/notes/search - Searching notes`
  );

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey;
  console.log(searchKey);

  // Use the Note model to find notes with content that contains the search key
  Note.find({ content: new RegExp(searchKey, "i") }) // 'i' makes the search case-insensitive
    .then((matchingNoteDocuments) => {
      // Successfully found matching note documents
      const notes = matchingNoteDocuments.map((noteDocument) => ({
        id: noteDocument._id,
        text: noteDocument.content,
        dateCreated: noteDocument.createdAt,
        lastModified: noteDocument.updatedAt,
      }));

      // Validate the notes array
      if (!validateNoteArray(notes)) {
        res.status(500).send("Invalid data type");
      } else {
        res.send({ notes });
      }
    })
    .catch((error) => {
      // Failed to query the database
      console.error(error);
      res.status(500).send("Fail to query");
    });
});
// TODO-7.1: Remove this line once you start working on TODO-7
// --- Remove section begins ---
// const notes = [
//   {
//     id: 5,
//     text: `This is a dummy note from search contains search key ${searchKey}!`,
//     dateCreated: "2021-04-15",
//     lastModified: "2021-04-17",
//   },
// ];
// if (!validateNoteArray(notes)) {
//   res.status(500).send("Invalid data type");
// }
// res.send({ notes });
// --- Remove section ends ---

/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete("/", (req, res) => {
  console.log(
    `[DELETE] http://localhost:${global.port}/notes - Deleting all notes`
  );

  Note.deleteMany({})
    .then(() => {
      // Successfully deleted all notes
      res.send();
    })
    .catch((error) => {
      // Failed to delete notes
      console.error(error);
      res.status(500).send("Fail to delete");
    });
});

// TODO-8.1: Remove this section once you start working on TODO-8
// --- Remove section begins ---
// --- Remove section ends ---

/* -------------------------------------------------------------------------- */

module.exports = router;
