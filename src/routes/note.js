const Note = require("../models/note.model"); // Import Note model

const express = require("express");
const router = express.Router();
const { validateNote } = require("../utils/validators");

/* ------------------------ TODO-4 - Create New Note ------------------------ */

/*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText

  		Your return object should be something similar to this:
      	{ id, text, dateCreated, lastModified }
  */

router.post("/", (req, res) => {
  console.log(
    `[POST] http://localhost:${global.port}/note - Storing a new note`
  );

  const newText = req.body.text;

  // Create a new note document using the Note model
  Note.create({ content: newText })
    .then((noteDocument) => {
      // Successfully created a new note document
      const newNote = {
        id: noteDocument._id,
        text: noteDocument.content,
        dateCreated: noteDocument.createdAt,
        lastModified: noteDocument.updatedAt,
      };

      // Validate the new note object
      if (!validateNote(newNote)) {
        res.status(500).send("Invalid data type");
      } else {
        res.status(201).send({ newNote });
      }
    })
    .catch((error) => {
      // Failed to create a new note document
      console.error(error);
      res.status(500).send("Fail to insert");
    });
});

// TODO-4.1: Remove this section once you start working on TODO-4
// --- Remove section begins ---
//   const newNote = {
//     id: 2,
//     text: newText,
//     dateCreated: new Date().toISOString().split("T")[0],
//     lastModified: new Date().toISOString().split("T")[0],
//   };
//   if (!validateNote(newNote)) {
//     res.status(500).send("Invalid data type");
//   }
//   res.status(201).send({ newNote });
//   // --- Remove section ends ---
// });
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put("/", (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`);

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/
  const noteId = req.body.id;
  const newText = req.body.text;

  // Use the Note model to find and update the note in the database
  Note.findByIdAndUpdate(
    noteId,
    { content: newText },
    { new: true, useFindAndModify: false }
  )
    .then((updatedNoteDocument) => {
      // Successfully updated the note document
      const updatedNote = {
        id: updatedNoteDocument._id,
        text: updatedNoteDocument.content,
        dateCreated: updatedNoteDocument.createdAt,
        lastModified: updatedNoteDocument.updatedAt,
      };

      // Validate the updated note object
      if (!validateNote(updatedNote)) {
        res.status(500).send("Invalid data type");
      } else {
        res.send({ updatedNote });
      }
    })
    .catch((error) => {
      // Failed to update the note document
      console.error(error);
      res.status(500).send("Fail to update");
    });

  // TODO-5.1: Remove this section once you start working on TODO-5
  // --- Remove section begins ---
  // const updatedNote = {
  //   id: noteId,
  //   text: newText,
  //   dateCreated: "2021-04-15",
  //   lastModified: new Date().toISOString().split("T")[0],
  // };
  // if (!validateNote(updatedNote)) {
  //   res.status(500).send("Invalid data type");
  // }
  // res.send({ updatedNote });
  // --- Remove section ends ---
});
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete("/", (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`);

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
  const noteId = req.body.id;

  Note.findByIdAndDelete(noteId, { useFindAndModify: false })
    .then((deletedNoteDocument) => {
      // Successfully deleted the note document
      if (deletedNoteDocument) {
        res.send({
          message: "Note deleted successfully",
          deletedNoteId: noteId,
        });
      } else {
        res.status(404).send({ message: "Note not found" });
      }
    })
    .catch((error) => {
      // Failed to delete the note document
      console.error(error);
      res.status(500).send("Fail to delete");
    });

  // TODO-6.1: Remove this section once you start working on TODO-6
  // --- Remove section begins ---
  // res.send();
  // --- Remove section ends ---
});
/* -------------------------------------------------------------------------- */

module.exports = router;
