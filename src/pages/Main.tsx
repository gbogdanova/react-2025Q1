import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import noImage from '../assets/no-image-available.jpg';

export default function Main() {
  const submissions = useSelector((state: RootState) => state.form.submissions);

  return (
    <div>
      <h2>Submissions:</h2>
      <ul>
        {submissions.map((sb, index) => (
          <li key={index}>
            {sb.image ? (
              <img
                src={sb.image}
                alt="Uploaded"
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
              <img
                src={noImage}
                alt="noImage"
                style={{ width: '100px', height: '100px' }}
              />
            )}
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
