import { CharacterDetails } from './../types/index';
import { CharacterList } from '../components/CharacterList';

const apiUrl = 'https://rickandmortyapi.com/api/';

export const fetchCharacterInfo = async (characterId?: string | null) => {
  let fetchCharacterUrl = apiUrl + 'character';
  if (characterId !== undefined && characterId !== null) {
    fetchCharacterUrl += characterId;
  }

  const response = await fetch(fetchCharacterUrl);
  const result = await response.json();
  return result;
};

export const fetchEpisodeInfo = async (pageNum?: string | null) => {
  let fetchEpisodeUrl = apiUrl + 'episode';

  if (pageNum !== undefined) {
    fetchEpisodeUrl += `?page=${pageNum}`;
  }
  const response = await fetch(fetchEpisodeUrl);
  const result = await response.json();
  return result;
};
