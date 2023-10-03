import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connexion from './pages/Connexion';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Connexion />} />
            <Route element={<Navbar />}>
            <Route path="admin" element={<Admin />}></Route>
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path='*' element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}