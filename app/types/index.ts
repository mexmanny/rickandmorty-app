export type CharacterDetailProps = {
  id: number;
  name: string;
  imageUrl: string;
};

export type CharacterDetailsData = {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results?: CharacterDetails[];
};

export type CharacterDetails = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Origin = {
  name: string;
  url: string;
};

export type Location = {
  name: string;
  url: string;
};

export type EpisodeDetailsResponse = {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };

  results?: EpisodeDetails[];
};

export type EpisodeDetails = {
  id: string;
  namw: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};
