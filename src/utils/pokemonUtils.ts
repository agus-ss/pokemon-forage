import { PokemonWithDetails } from '../types/types';

export const categorizePokemon = (detailedPokemonList: PokemonWithDetails[]): { [type: string]: PokemonWithDetails[] } => {
  return detailedPokemonList.reduce((acc, pokemon) => {
    pokemon.types.forEach(type => {
      if (!acc[type]) acc[type] = [];
      acc[type].push(pokemon);
    });
    return acc;
  }, {} as { [type: string]: PokemonWithDetails[] });
};
