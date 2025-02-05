import Search from './Search';

export default function Header() {
  return (
    <header className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 p-6 flex justify-between">
      <div className="font-[Orbitron] text-2xl text-amber-300 py-1">
        Star Wars
      </div>
      <Search />
    </header>
  );
}
