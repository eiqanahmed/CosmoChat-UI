import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Activity from './components/Activity';
import ChatUI from './components/ChatUI';
import NavBar from './components/NavBar';


function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<ChatUI />} />
            <Route path="/chatui" element={<ChatUI />} />
            <Route path="/activity" element={<Activity />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
