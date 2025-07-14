import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import api from '../lib/axios';
import { useParams, useNavigate, Link } from 'react-router'; // <-- Use react-router-dom
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Failed to fetch note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    }
    catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
      if(error.response && error.response.status === 429) {
        toast.error('Rate limit reached. Please try again later.', { duration: 5000 , icon: '🚫' });
      }
    }
  }

  const handleSave = async () => {
    if (!note.title || !note.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      setSaving(true);
      await api.put(`/notes/${note._id}`, note);
      toast.success('Note updated successfully');
    } catch (error) {
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'
        style={{
          background: "linear-gradient(135deg, #a7c7e7 0%, #f8bbd0 50%, #d1c4e9 100%)"
        }}>
        <LoaderIcon className='animate-spin size-10 text-sky-400' />
      </div>
    )
  }

  return(
    <div className='min-h-screen'
      style={{
        background: "linear-gradient(135deg, #a7c7e7 0%, #f8bbd0 50%, #d1c4e9 100%)"
      }}>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className="btn btn-ghost text-blue-400 bg-blue-50 hover:bg-blue-100 border border-blue-200">
              <ArrowLeftIcon className="mr-2 text-blue-400" /> Go Back
            </Link>
            <button onClick={handleDelete} className='btn bg-pink-100 text-pink-400 hover:bg-pink-200 border-none'>
              <Trash2Icon className='h-5 w-5 mr-1' />Delete Note
            </button>
          </div>

          <div className='card bg-pink-50 border border-pink-200 shadow-lg rounded-xl'>
            <div className='card-body'>
              <div className='form-control mb-4 px-4'>
                <label className='label'>
                  <span className='label-text text-purple-400 font-semibold'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Note title'
                  className='input input-bordered bg-blue-50 border-blue-200 text-blue-400 placeholder:text-blue-300'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  required
                />
              </div>

              <div className='form-control mb-4 px-4'>
                <label className='label'>
                  <span className='label-text text-purple-400 font-semibold'>Content</span>
                </label>
                <textarea
                  placeholder='Note content'
                  className='textarea textarea-bordered h-32 bg-purple-50 border-purple-200 text-purple-400 placeholder:text-purple-300'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  required
                />
              </div>

              <div className='card-actions justify-end'>
                <button
                  className='btn bg-sky-100 text-sky-400 border-none hover:bg-sky-200 rounded-full'
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? <LoaderIcon className='animate-spin' /> : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
