import express from 'express';
import Note from '../models/Notes.js';
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';


import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', protect, async (req, res) => {
//   const notes = await Note.find({ user: req.user._id });
//   res.json(notes);
// });

// router.post('/', protect, async (req, res) => {
//   const { title, content, tags } = req.body;
//   const newNote = new Note({user: req.user._id, title, content, tags });
//   const savedNote = await newNote.save();
//   res.status(201).json(savedNote);
// });


router.get("/", protect, getAllNotes);

router.get("/:id", protect, getNoteById);

router.post("/", protect, createNote);

router.put("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

export default router;