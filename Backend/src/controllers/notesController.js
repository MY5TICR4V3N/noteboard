import Note from "../models/Notes.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
}

export async function getNoteById(req, res) {
  try {
    const notes = await Note.findById(req.params.id);
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content});
    //const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Error creating note" });
  }
}

export async function updateNote(req, res) {
  try{
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Error updating note" });
  }
}

export async function deleteNote(req, res) {
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
}
