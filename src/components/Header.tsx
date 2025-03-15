import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="width-[100%] flex justify-between p-10 bg-blue-300">
      <h1>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
          }
        >
          React forms
        </NavLink>
      </h1>
      <nav>
        <NavLink
          to="/uncontrolled-form"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
          }
        >
          Uncontrolled Form
        </NavLink>
        <NavLink
          to="/hook-form"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold ml-4' : 'text-gray-700 ml-4'
          }
        >
          Hook Form
        </NavLink>
      </nav>
    </header>
  );
}
