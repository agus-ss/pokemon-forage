import { NamedAPIResource } from 'pokenode-ts';

export interface PokemonWithDetails extends NamedAPIResource {
  imageUrl: string;
  types: string[];
}