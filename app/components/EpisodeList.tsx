'use client';
import { useEffect, useState } from 'react';
import { EpisodeDetailsResponse } from '../types';

const EpisodeList = ({
  setCharacterUrls,
}: {
  setCharacterUrls: (characterUrls: string[]) => void;
}) => {
  const [pageNum, setPageNum] = useState('');
  const [episodeData, setEpisodeData] = useState<EpisodeDetailsResponse | null>(
    null
  );

  const [clickedEpisodeId, setClickedEpisodeId] = useState('');

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const response = await fetch(`/api/episodes?page=${pageNum}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setEpisodeData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchEpisodeData();
  }, [pageNum]);

  const splitPageNum = (nextPage: boolean) => {
    if (nextPage) {
      if (episodeData?.info.next) {
        setPageNum(episodeData?.info.next.split('page=')[1]);
      }
    } else {
      if (episodeData?.info.prev) {
        setPageNum(episodeData?.info.prev.split('page=')[1]);
      }
    }
  };

  return (
    <>
      <h1 className="text-center">Episode List</h1>
      {episodeData?.results.map((episode) => (
        <div key={episode.id} id={episode.id}>
          <p
            className={`w-full p-1 cursor-pointer bg-blue-400 hover:bg-blue-600 ${
              clickedEpisodeId === episode.id ? 'bg-blue-600' : 'bg-blue-400'
            } transition duration-300 text-center my-2 rounded-md`}
            onClick={() => {
              if (episode.id != clickedEpisodeId) {
                setCharacterUrls(episode.characters);
                setClickedEpisodeId(episode.id);
              } else {
                setClickedEpisodeId('');
                setCharacterUrls([]);
              }
            }}
          >
            {episode.episode}
          </p>
        </div>
      ))}
      {episodeData && (
        <div className="flex justify-center m-10">
          <button
            disabled={!episodeData?.info.prev}
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
            disabled={!episodeData?.info.next}
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

export default EpisodeList;
