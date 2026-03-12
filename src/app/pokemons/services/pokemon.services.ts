import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon, PokemonApiResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonServices {
  private hhtp = inject(HttpClient);
  private readonly urlBase =`https://pokeapi.co/api/v2`

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    return this.hhtp
      .get<PokemonApiResponse>(`${this.urlBase}/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemons;
        }),
        // tap(pokemons =>console.log(pokemons))
        // tap(console.log)
      );
  }
  public loadPokemonById(id: string) {
    return this. hhtp.get<Pokemon | null>(`${this.urlBase}/pokemon/${id}`)
  }
}
