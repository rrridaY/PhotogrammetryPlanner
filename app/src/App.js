import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapEditor from './components/MapEditor.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/map-editor">Map Editor</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/map-editor" element={<MapEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
