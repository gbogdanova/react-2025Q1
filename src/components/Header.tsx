import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/">React forms</Link>
      </h1>
      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form </Link>
        <Link to="/hook-form">Hook Form</Link>
      </nav>
    </header>
  );
}
