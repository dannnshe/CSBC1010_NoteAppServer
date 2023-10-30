const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  note_category: String,
  note_list_name: String,
}, { timestamps: true });

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);
