import { Link, useNavigate } from 'react-router';
import { PlusIcon, LogOutIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    setIsLoggedIn(!!userInfo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/auth'); // Redirect to auth page
  };

  return (
    <header className="navbar bg-blue-100 border-b border-blue-200">
      <div className="w-full p-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold text-blue-400 font-mono tracking-tight">Thinkboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn bg-pink-100 text-pink-400 border-none hover:bg-pink-200">
              <PlusIcon className="size-5 text-pink-400" />
              <span>New Note</span>
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="btn bg-red-100 text-red-400 border-none hover:bg-red-200"
              >
                <LogOutIcon className="size-5 text-red-400" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

