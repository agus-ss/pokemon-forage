import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonWithDetails } from '../types/types';

interface PokemonCardProps {
  pokemon: PokemonWithDetails;
  isFavourite: boolean;
  handleFavourite: (name: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isFavourite, handleFavourite }) => {
  return (
    <div key={pokemon.name} className="relative min-w-[294px]">
      <Link to={`/pokemon/${pokemon.name}`} className="block relative bg-gray-800 rounded overflow-hidden shadow-lg transform transition-transform hover:scale-105 w-[294px] h-[156px]">
        <img src={pokemon.imageUrl} alt={pokemon.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-75 text-white flex items-center justify-between">
          <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full ${isFavourite ? 'bg-red-500' : 'bg-blue-500'}`}
            onClick={(e) => {
              e.preventDefault();
              handleFavourite(pokemon.name);
            }}
          >
            {isFavourite ? '♥' : '♡'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
