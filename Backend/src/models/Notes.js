import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This links the note to a user
      required: true,
    },
    tags: {
      type: [String],
      default: []
    }
  },
{
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Note = mongoose.model("Note", noteSchema);

export default Note;