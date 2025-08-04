import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note}) => {
  const handleDelete = async (e,id) => {
    e.preventDefault();
    if(!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
    }
    catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
      if(error.response && error.response.status === 429) {
        toast.error('Rate limit reached. Please try again later.', { duration: 5000 , icon: '🚫' });
      }
    }
  }
  return (
    <Link to={`/note/${note._id}`} className='card bg-blue-50 border-t-4 border-purple-200 hover:shadow-lg transition-all duration-200 rounded-xl'>
      <div className='card-body p-5'>
        <h3 className='card-title text-blue-300 font-bold'>{note.title}</h3>
        <p className='text-purple-400/80 line-clamp-3'>{note.content}</p>
        <div className='flex flex-wrap gap-2 mt-2'>
          {note.tags.map((tag) => (
            <button key={tag} className='badge badge-sm badge-blue-300 text-pink-300'>{tag}</button>
          ))}
        </div>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-xs text-pink-300'>
                {formatDate(new Date(note.createdAt))}
            </span>
            <div className='flex items-center gap-2'>
                    <PenSquareIcon className='size-4 text-pink-300' />
                <button className='btn btn-ghost btn-xs text-pink-400 hover:bg-pink-100' onClick={(e) => handleDelete(e,note._id)}>
                   <Trash2Icon className='size-4' />
                </button>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
