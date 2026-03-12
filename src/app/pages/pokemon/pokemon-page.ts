import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonServices } from '../../pokemons/services/pokemon.services';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
})
export default class PokemonPage implements OnInit {
  private pokemonServices = inject(PokemonServices);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  // public readonly pokemonTitle = computed(
  //   () =>
  //         this.title.setTitle(`Pokemon: ${this.pokemon()!.name}`)

  // );
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonServices
      .loadPokemonById(id)
      .pipe(
        tap((pokemon) => {
          const pageTitle = `Pokemon ${pokemon?.id}: ${pokemon?.name}`
          const pageDescription = `Página del pokemon ${pokemon?.name}`
          this.title.setTitle(pageTitle);
          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescription });
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` });
        }),
      )
      .subscribe(this.pokemon.set);
  }
}
