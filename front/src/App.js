import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Clients from './pages/Clients';
import Candidates from './pages/Candidates';

export default function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="clients" element={<Clients />}></Route>
          <Route path="candidates" element={<Candidates />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}