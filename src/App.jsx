import React from 'react';
import CompassGame from './components/CompassGame.jsx';
export default function App() {
  return (
    <div className="flex min-h-screen items-start sm:items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <CompassGame />
      </div>
    </div>
  );
}

