'use client';

import { useEffect, useState } from 'react';
import { CharacterDetails, CharacterDetailsData } from '../types';
import CharacterCard from './CharacterCard';

export const CharacterList = ({
  characterUrls,
}: {
  characterUrls: string[];
}) => {
  const [characterId, setCharacterId] = useState('');
  const [characterData, setCharacterData] =
    useState<CharacterDetailsData | null>({});

  useEffect(() => {
    const fetchCharacterData = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };

    const fetchDataForUrls = async () => {
      const responses: (CharacterDetails | null)[] = await Promise.all(
        characterUrls.map((url) => fetchCharacterData(url))
      );

      const combinedData: CharacterDetails[] = responses
        .filter((data): data is CharacterDetails => data !== null)
        .reduce(
          (acc, data) => (data ? [...acc, data] : acc),
          [] as CharacterDetails[]
        );

      setCharacterData({ results: combinedData });
    };

    if (characterUrls.length > 0) {
      fetchDataForUrls();
    } else {
      fetchCharacterData('/api/characters').then((data) => {
        if (data) {
          setCharacterData(data);
        }
      });
    }
  }, [characterId, characterUrls]);

  return (
    <>
      {characterData?.results &&
        characterData?.results.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            imageUrl={character.image}
          ></CharacterCard>
        ))}
    </>
  );
};
