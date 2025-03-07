import React from 'react';
import { useContext } from 'react';
import InfContext from '../context/theme-context';

export default function NotFound() {
  const { theme } = useContext(InfContext);
  return (
    <div
      className={`flex flex-col justify-center items-center h-screen ${theme === 'dark' ? 'bg-[#1a1f45]' : 'text-blue-950'}`}
    >
      <h1 className="pb-3 text-8xl font-[Orbitron] text-amber-300">404</h1>
      <p className="font-[Orbitron] text-xl">Page Not Found</p>
    </div>
  );
}
