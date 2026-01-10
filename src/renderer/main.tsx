import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './pages/Home';
import Config from './pages/Config';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewOrder from './pages/NewOrder';
import './index.css'



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewOrder />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
