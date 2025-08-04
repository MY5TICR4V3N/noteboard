import { useState } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; 


export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? '/user/login'
      : '/user/register';

    try {
      const { data } = await api.post(url, formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      JSON.parse(localStorage.getItem("userInfo"));

      toast.success(`Welcome ${data.name || data.email}!`);
      // Redirect to homepage or notes page
      //window.location.href = '/';
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200" style={{
        background: "linear-gradient(135deg, #a7c7e7 0%, #f8bbd0 50%, #d1c4e9 100%)"
      }}>
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-sky-300">{isLogin ? 'Login' : 'Sign up'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="label text-pink-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          )}
          <div>
            <label className="label text-pink-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label text-pink-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn bg-pink-100 text-pink-400 border-none hover:bg-sky-200 w-full">
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </form>
        <p className="text-center text-sky-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleMode} className="link text-pink-500 hover:underline hover:text-sky-200">
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
