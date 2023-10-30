const config = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose"); // Import mongoose

const healthRouter = require("./routes/health");
const notesRouter = require("./routes/notes");
const noteRouter = require("./routes/note");

if (config.error) {
  throw config.error;
}

const port = process.env.PORT || 3001;
global.port = port;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuring the database

const dbConfig = require('./config/database.config.js');

/*
  TODO-1: Setup Database connection
*/
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option to avoid deprecation warnings
  })
  .then(() => {
    console.log("Successfully connected to the database");
    /*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/

    // const noteSchema = new mongoose.Schema(
    //   {
    //     title: String,
    //     content: String,
    //     note_category: String,
    //     note_list_name: String,
    //   },
    //   {
    //     timestamps: true,
    //   }
    // );

    // // 'Note' is the name of the collection (table), and it will be created if it doesn't already exist.
    // const Note = mongoose.model("Note", noteSchema);
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("CSBC1010 Assignment 3 - My Notes");
});

app.use("/health", healthRouter);
app.use("/notes", notesRouter);
app.use("/note", noteRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
