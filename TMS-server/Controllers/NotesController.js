const NotesModel = require("../Models/Notes");

const createNotes = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const newNotes = new NotesModel({
      userId: req.user._id, 
      title,
      text,
    });
    await newNotes.save();
    res.status(201).json({
      message: "Notes saved successfully",
      success: true,
      data: newNotes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};
const getNotes = async (req, res) => {
  try {
    const notes = await NotesModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    // Ensure the note belongs to the user
    const note = await NotesModel.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    await NotesModel.deleteOne({ _id: noteId });

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete note",
    });
  }
};
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    const { title, text } = req.body;

    const note = await NotesModel.findOneAndUpdate(
      { _id: noteId, userId },
      { title, text },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Note updated", data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNotes,
  getNotes,
  deleteNote,
  updateNote
};

