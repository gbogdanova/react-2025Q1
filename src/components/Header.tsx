import Search from './Search';

interface HeaderProps {
  onClick?: () => void;
}

export default function Header({ onClick }: HeaderProps) {
  return (
    <header
      className="w-full mx-auto px-4 sm:px-6 lg:px-8 p-6 flex justify-between"
      onClick={onClick}
    >
      <div className="font-[Orbitron] text-2xl text-amber-300 py-1">
        Star Wars
      </div>
      <Search />
    </header>
  );
}
