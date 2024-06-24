import React, { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import { fetchPokemonData } from '../api/pokemonApi';
import { categorizePokemon } from '../utils/pokemonUtils';
import { PokemonWithDetails } from '../types/types';

const HomePage: React.FC = () => {
  const [categorizedPokemon, setCategorizedPokemon] = useState<{ [type: string]: PokemonWithDetails[] }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData();
      setCategorizedPokemon(categorizePokemon(data));
      setIsDataFetched(true);
    };

    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  useEffect(() => {
    const favs = localStorage.getItem('favourites');
    if (favs) {
      setFavourites(JSON.parse(favs));
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFavourite = (name: string) => {
    let updatedFavourites;
    if (favourites.includes(name)) {
      updatedFavourites = favourites.filter(fav => fav !== name);
    } else {
      updatedFavourites = [...favourites, name];
    }
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded focus:outline-none focus:border-blue-500"
      />
      <PokemonList
        categorizedPokemon={categorizedPokemon}
        searchTerm={searchTerm}
        favourites={favourites}
        handleFavourite={handleFavourite}
      />
    </div>
  );
};

export default HomePage;
