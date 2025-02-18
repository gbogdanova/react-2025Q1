import { useContext } from 'react';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import InfContext from '../context/planets-context';

export default function ThemeBtn() {
  const { theme, setTheme } = useContext(InfContext);

  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="flex justify-center w-[33%]">
      <button className="h-10 w-30 mt-0.5 cursor-pointer" onClick={handleTheme}>
        <img
          src={theme === 'dark' ? moon : sun}
          alt="Switch Theme"
          className="h-full w-full object-contain"
        />
      </button>
    </div>
  );
}
