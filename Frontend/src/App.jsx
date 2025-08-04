import {Route, Routes} from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import toast, { Toaster } from 'react-hot-toast';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <div data-theme="pastel"
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #a7c7e7 0%, #f8bbd0 50%, #d1c4e9 100%)"
      }}>
      <Toaster />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
