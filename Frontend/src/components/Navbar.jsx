import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar bg-blue-100 border-b border-blue-200">
      <div className="w-full p-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold text-blue-400 font-mono tracking-tight">Thinkboard</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn bg-pink-100 text-pink-400 border-none hover:bg-pink-200">
              <PlusIcon className="size-5 text-pink-400" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
