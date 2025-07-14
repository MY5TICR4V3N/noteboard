import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';  
import api from '../lib/axios';

const CreatePage = () => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    if (!title || !content) {
      toast.error('Title and content are required');
      return;
    }
    setLoading(true);
    try{
      await api.post('/notes', {
        title,
        content
      });
      toast.success('Note created successfully');
      navigate('/');

    } catch (error) {
      toast.error('Error creating note');
      if(error.response && error.response.status === 429) {
        toast.error('Rate limit reached. Please try again later.', { duration: 5000 , icon: '🚫' });
      }
    } finally {
      setLoading(false);
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #a7c7e7 0%, #f8bbd0 50%, #d1c4e9 100%)"
      }}>
        <div className='max-w-3xl w-full mx-auto px-4 py-8'>
          <Link to={"/"} className="btn btn-ghost mb-6 text-blue-400 bg-blue-50 hover:bg-blue-100 border border-blue-200"><ArrowLeftIcon className="mr-2 text-blue-400" /> Go Back</Link>
          <div className='card bg-pink-50 border border-pink-200 shadow-lg rounded-xl'>  
            <h2 className='card-title text-2xl font-bold mb-4 text-sky-400 px-4'>Create a New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4 px-4'>
                <label className='label'>
                  <span className='label-text text-purple-400 font-semibold '>Title</span>
                </label>
                <input type='text'
                placeholder='Note title'
                className='input input-bordered bg-blue-50 border-blue-200 text-blue-400 placeholder:text-blue-300'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text text-purple-400 font-semibold'>Content</span>
                </label>
                <textarea
                  placeholder='write your note here...'
                  className='textarea textarea-bordered h-32 bg-purple-50 border-purple-200 text-purple-400 placeholder:text-purple-300'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className='card-actions justify-end'>
                <button type='submit'
                 className='btn bg-sky-100 text-sky-400 border-none hover:bg-sky-200 rounded'
                 disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
              </div>
            </form>

          </div>
        </div>

    </div>
  )
}

export default CreatePage
