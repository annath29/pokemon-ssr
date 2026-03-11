import { Component, input } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
 public pokemons = input.required<SimplePokemon[]>();
}
