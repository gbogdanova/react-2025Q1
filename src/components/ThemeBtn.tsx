import { useContext } from 'react';
import InfContext from '../context/theme-context';

export default function ThemeBtn() {
  const { theme, setTheme } = useContext(InfContext);

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex justify-center w-[33%]">
      <button className="h-10 w-30 mt-0.5 cursor-pointer" onClick={handleTheme}>
        <img
          src={theme === 'dark' ? '/assets/moon.png' : '/assets/sun.png'}
          alt="Switch Theme"
          className="h-full w-full object-contain"
        />
      </button>
    </div>
  );
}
