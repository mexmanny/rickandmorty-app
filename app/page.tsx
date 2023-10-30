'use client';

import Image from 'next/image';
import { CharacterList } from './components/CharacterList';
import EpisodeList from './components/EpisodeList';
import { useState } from 'react';

export default function Home() {
  const [characterUrls, setCharacterUrls] = useState([]);
  return (
    <main className="flex w-screen h-screen overflow-hidden">
      <div className="w-[300px] p-8 h-screen overflow-y-auto">
        <EpisodeList setCharacterUrls={setCharacterUrls} />
      </div>
      <div className="w-full grid md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-8 p-8 h-screen overflow-y-auto">
        <CharacterList characterUrls={characterUrls} />
      </div>
    </main>
  );
}
