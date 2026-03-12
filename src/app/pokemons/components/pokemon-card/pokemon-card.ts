import { Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();

  // logEffect = effect (() => {
  //   console.log('pokemoncard:', this.pokemon())
  // })// se dispara siempre que cambie la señal

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`,
  );
}
