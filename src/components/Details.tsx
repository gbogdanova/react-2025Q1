import { useRouter } from 'next/router';
import { useContext } from 'react';
import Spinner from './Spinner';
import { Character } from '../api/interface-api';
import InfContext from '../context/theme-context';

interface DetailsProps {
  selectedCharacter: Character | undefined;
  isDetailLoading: boolean;
}

export default function Details({
  selectedCharacter,
  isDetailLoading,
}: DetailsProps) {
  const { theme } = useContext(InfContext);
  const router = useRouter();

  const handleClose = () => {
    const { page, search } = router.query;
    router.push(`/?page=${page || 1}&search=${search || ''}`, undefined, {
      shallow: true,
    });
  };

  if (isDetailLoading) {
    return (
      <div className="w-1/2">
        <Spinner />
      </div>
    );
  }

  if (!selectedCharacter) {
    return (
      <p
        className={
          theme === 'dark' ? 'bg-[#1a1f45]  text-white ' : 'text-blue-950'
        }
      >
        Select a character to see details.
      </p>
    );
  }

  return (
    <section
      className={`flex flex-col gap-5 h-full p-4 border relative w-1/2 ${theme === 'dark' ? 'bg-[#1a1f45] text-white ' : 'text-blue-950'}`}
    >
      <button
        onClick={handleClose}
        className={`absolute top-2 right-2 text-gray-300 cursor-pointer ${theme === 'dark' ? ' hover:text-white' : ' hover:text-[#1a1f45]'}`}
      >
        ✖ Close
      </button>
      <h2 className="text-2xl font-semibold">{selectedCharacter.name}</h2>
      <img
        src={selectedCharacter.image}
        alt={selectedCharacter.name}
        width={200}
        className="rounded-lg mt-2"
      />
      <p>
        <strong>Species:</strong> {selectedCharacter.species}
      </p>
      <p>
        <strong>Status:</strong> {selectedCharacter.status}
      </p>
      <p>
        <strong>Gender:</strong> {selectedCharacter.gender}
      </p>
    </section>
  );
}
