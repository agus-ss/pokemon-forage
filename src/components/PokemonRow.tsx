import React, { useRef } from 'react';
import PokemonCard from './PokemonCard';
import { PokemonWithDetails } from '../types/types';

interface PokemonRowProps {
  type: string;
  pokemonList: PokemonWithDetails[];
  searchTerm: string;
  favourites: string[];
  handleFavourite: (name: string) => void;
}

const PokemonRow: React.FC<PokemonRowProps> = ({ type, pokemonList, searchTerm, favourites, handleFavourite }) => {
  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (filteredPokemon.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-2xl font-bold capitalize text-white">{type}</h2>
      <div className="relative group">
        <button
          onClick={scrollLeft}
          className="arrow-button absolute left-0 top-0 bg-gray-700 text-white p-2 rounded-l-full z-10"
        >
          <span className="text-2xl">‹</span>
        </button>
        <div ref={containerRef} className="flex space-x-2 overflow-x-scroll py-4 hide-scrollbar">
          {filteredPokemon.map((pokemon: PokemonWithDetails) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              isFavourite={favourites.includes(pokemon.name)}
              handleFavourite={handleFavourite}
            />
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="arrow-button absolute right-0 top-0 bg-gray-700 text-white p-2 rounded-r-full z-10"
        >
          <span className="text-2xl">›</span>
        </button>
      </div>
    </div>
  );
};

export default PokemonRow;
