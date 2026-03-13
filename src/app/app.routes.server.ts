import { RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonServices } from './pokemons/services/pokemon.services';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
  // {
  //   path: 'pokemons/:id',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     const pokemonsIDs = [...Array(10).keys()].map((i) => i + 1);
  //     // const pokemonsIDs = Array.from({ length: 10 }, (_, i) => i + 1);

  //     return pokemonsIDs.map((id) => ({ id: id.toString() }));
  //     // return [{ id: '1' }, { id: 'aerodactyl' }];
  //   },
  // },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const totalPages = 5;
      const pages = [...Array(totalPages).keys()].map((i) => i + 1);
      return pages.map((page) => ({ page: page.toString() }));
      // return [{ page: '1' }, { page: '2' }, { page: '3' }];
    },
  },
  //rutas basdas en httpp
  // {
  //   path: 'pokemons/:id',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     const total_pokemons = 10
  //     const pokemonListNames = await fetch(`https://pokeapi.co/api/v2/pokemon?limit${total_pokemons}`).then(resp => resp.json());
  //     return pokemonListNames?.results.map(pokemon =>({name: pokemon.name}))
  //   },
  // },
  {
    path: 'pokemons/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const total_pokemons = 10
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${total_pokemons}`);
      const data = await response.json();

      return data.results.map((pokemon: any) => ({
        name: pokemon.name,
      }));
    },
  },
];
