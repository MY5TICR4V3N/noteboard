import Navbar from '../components/Navbar';
import { useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchNotes = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (!userInfo) {
        alert('You are not logged in');
        window.location.href = '/auth';
        return;
      }
      try{
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.error('Error fetching notes:', error);
        if(error.response?.status === 429) {
          setIsRateLimited(true); // Show the rate limit popup
        }
        else {
          toast.error('Failed to fetch notes');
        }
      }finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen '>
      <Navbar />
      <div className="my-4 max-w-7xl mx-auto p-4 mt-6">
        <input
          type="text"
          style={{ backgroundColor: 'lightblue'}}
          placeholder="Search notes..."
          className="input input-bordered w-full max-w-md text-pink-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes....</div>}


        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes
            .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()) || note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
            .map((note) => (
            <NoteCard key={note._id} note={note} />
            ))}

          </div>
        )}
    </div>
      </div>
  );      
}
export default HomePage
