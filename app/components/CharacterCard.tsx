import React from 'react';
import { CharacterDetailProps } from '../types';
import Image from 'next/image';

type Props = {};

const CharacterCard = ({ id, name, imageUrl }: CharacterDetailProps) => {
  return (
    <div key={id}>
      <h1 className="text-sm lg:text-lg my-5">{name}</h1>

      <Image
        src={imageUrl}
        alt="Image of Character"
        width={200}
        height={200}
        layout="responsive"
      ></Image>
    </div>
  );
};

export default CharacterCard;
