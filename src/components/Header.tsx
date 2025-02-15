import { useContext } from 'react';
import Search from './Search';
import ThemeBtn from './ThemeBtn';
import InfContext from '../store/planets-context';

interface HeaderProps {
  onClick?: () => void;
}

export default function Header({ onClick }: HeaderProps) {
  const { theme } = useContext(InfContext);

  return (
    <header
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 p-6 flex justify-between ${theme === 'dark' ? 'bg-[#1a1f45]' : 'text-blue-950'}`}
      onClick={onClick}
    >
      <div className="w-[33%] font-[Orbitron] text-3xl text-amber-300 py-1">
        Star Wars
      </div>
      <ThemeBtn />
      <Search />
    </header>
  );
}
