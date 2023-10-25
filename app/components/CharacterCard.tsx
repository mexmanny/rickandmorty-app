import React from 'react';
import { CharacterDetailProps } from '../types';
import Image from 'next/image';

type Props = {};

const CharacterCard = ({ id, name, imageUrl }: CharacterDetailProps) => {
  return (
    <div key={id}>
      <h1 className="text-center text-2xl m-5">{name}</h1>
      <Image
        src={imageUrl}
        alt="Image of Character"
        width={500}
        height={500}
      ></Image>
    </div>
  );
};

export default CharacterCard;
