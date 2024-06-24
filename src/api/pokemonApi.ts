import { PokemonClient, PokemonType } from 'pokenode-ts';
import { getCachedData, hasCachedData } from '../utils/cacheUtil';
import { PokemonWithDetails } from '../types/types';

export const fetchPokemonData = async (): Promise<PokemonWithDetails[]> => {
  const api = new PokemonClient();
  const response = await api.listPokemons(0, 151);
  const allPokemon = response.results;

  const detailedPokemonList: PokemonWithDetails[] = [];

  for (let i = 0; i < allPokemon.length; i += 20) {
    const batch = allPokemon.slice(i, i + 20);

    // Check if all batch items are cached
    const isBatchCached = batch.every(pokemon => hasCachedData(pokemon.name));

    const batchDetails = await Promise.all(
      batch.map(async (pokemon) => {
        const details = await getCachedData(pokemon.name, () => api.getPokemonByName(pokemon.name));
        return {
          ...pokemon,
          imageUrl: details.sprites.front_default || '',
          types: details.types.map((typeInfo: PokemonType) => typeInfo.type.name),
        };
      })
    );

    detailedPokemonList.push(...batchDetails);

    // Sleep for 1 second after each batch only if not all items are cached
    if (!isBatchCached && i + 20 < allPokemon.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return detailedPokemonList;
};
