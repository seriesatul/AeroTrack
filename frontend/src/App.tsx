// frontend/src/App.tsx
import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'; // Import our new component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AeroTrack – Real-Time Telemetry Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;