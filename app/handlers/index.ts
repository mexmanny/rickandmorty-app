const apiUrl = 'https://rickandmortyapi.com/api/character';

export const fetchCharacterInfo = async (pageNum?: string | null) => {
  let fetchCharacterUrl = apiUrl;
  if (pageNum !== undefined) {
    fetchCharacterUrl += `?page=${pageNum}`;
  }
  const response = await fetch(fetchCharacterUrl);
  const result = await response.json();
  return result;
};
