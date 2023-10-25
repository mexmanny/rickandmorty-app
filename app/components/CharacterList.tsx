'use client';

import { useEffect, useState } from 'react';
import { CharacterDetailsData } from '../types';
import CharacterCard from './CharacterCard';

export const CharacterList = () => {
  const [pageNum, setPageNum] = useState('');
  const [characterData, setCharacterData] =
    useState<CharacterDetailsData | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await fetch(`/api/characters?page=${pageNum}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setCharacterData(responseData.characterInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCharacterData();
  }, [pageNum]);

  const splitPageNum = (nextPage: boolean) => {
    if (nextPage) {
      if (characterData?.info.next) {
        setPageNum(characterData?.info.next.split('page=')[1]);
      }
    } else {
      if (characterData?.info.prev) {
        setPageNum(characterData?.info.prev.split('page=')[1]);
      }
    }
  };

  return (
    <>
      {characterData?.results.map((character) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          imageUrl={character.image}
        ></CharacterCard>
      ))}
      {characterData && (
        <div className="flex justify-center m-10">
          <button
            disabled={!characterData?.info.prev}
            onClick={() => {
              splitPageNum(false);
            }}
            className="mr-10 rounded px-3 py-2 mt-23 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 transition-all duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white flex justify-center"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
          </button>
          <button
            disabled={!characterData?.info.next}
            onClick={() => {
              splitPageNum(true);
            }}
            className="rounded px-3 py-2 mt-23 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 transition-all duration-200"
            style={{ margin: '0 0' }}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
