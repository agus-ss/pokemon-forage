import React from 'react';
import PokemonRow from './PokemonRow';
import { PokemonWithDetails } from '../types/types';

interface PokemonListProps {
  categorizedPokemon: { [type: string]: PokemonWithDetails[] };
  searchTerm: string;
  favourites: string[];
  handleFavourite: (name: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ categorizedPokemon, searchTerm, favourites, handleFavourite }) => {
  return (
    <>
      {Object.keys(categorizedPokemon).map(type => (
        <PokemonRow
          key={type}
          type={type}
          pokemonList={categorizedPokemon[type]}
          searchTerm={searchTerm}
          favourites={favourites}
          handleFavourite={handleFavourite}
        />
      ))}
    </>
  );
};

export default PokemonList;
