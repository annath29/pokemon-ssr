import { Component } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {

}
