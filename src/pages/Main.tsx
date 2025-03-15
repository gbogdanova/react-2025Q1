import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import noImage from '../assets/no-image-available.jpg';

export default function Main() {
  const submissions = useSelector((state: RootState) => state.form.submissions);

  return (
    <div>
      <ul className="grid grid-cols-3 gap-6 m-10">
        {submissions.map((sb, index) => (
          <li
            key={index}
            className="flex flex-col gap-2 justify-center items-center align- border-2 border-blue-800"
          >
            {sb.image ? (
              <div className="w-[100px]">
                <img
                  src={sb.image}
                  alt="Uploaded"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            ) : (
              <img
                src={noImage}
                alt="noImage"
                style={{ width: '100px', height: '100px' }}
              />
            )}
            <p>Name: {sb.name}</p>
            <p>Age: {sb.age}</p>
            <p>Email: {sb.email}</p>
            <p>Password: {sb.password}</p>
            <p>Gender: {sb.gender}</p>
            <p>Accepted: {sb.acceptTerms ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
