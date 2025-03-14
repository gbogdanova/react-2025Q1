import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Main() {
  const submissions = useSelector((state: RootState) => state.form.submissions);

  return (
    <div>
      <h2>Submissions:</h2>
      <ul>
        {submissions.map((sb, index) => (
          <li key={index}>
            <p>{sb.name}</p>
            <p>{sb.age}</p>
            <p>{sb.email}</p>
            <p>{sb.password}</p>
            <p>{sb.gender}</p>
            <p>{sb.acceptTerms ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
