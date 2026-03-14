import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCard } from './pokemon-card';
import { provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasur',
};

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;
    //valores de inputs
    // fixture.componentRef.setInput('pokemon',mockPokemon)
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });
    await fixture.whenStable();
  });

  it('should create', () => {
    // console.log(fixture.nativeElement.innerHTML);
    expect(component).toBeTruthy();
  });
  it('should have the simplepokemon signal input', () => {
    // console.log(fixture.nativeElement.innerHTML)
    // expect(component.pokemon()).toBe(mockPokemon);//compara posicion en memoria de los objetos
    expect(component.pokemon()).toStrictEqual(mockPokemon); //compara contenido los objetos
  });
  it('should computed the correct pokemon image URL', () => {
    const expectedUrlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonImage()).toBe(expectedUrlImage);
  });
  it('should render pokemon image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement; //elemento renderizado en el 'dom'
    const component = compiled.querySelector('img');

    expect(component).toBeTruthy();
    const expectedUrlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;

    expect(component?.getAttribute('src')).toBe(expectedUrlImage);
    expect(component?.getAttribute('alt')).toBe(mockPokemon.name);
  });
  it('should render pokemon name correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const component = compiled.querySelector('h2');
    expect(component).toBeTruthy();
    expect(component?.textContent.trim()).toBe(mockPokemon.name)
  });
  it('should have the corrrect routlink configuration', () => {
    // console.log(fixture.nativeElement.innerHTML)
    //para el rouer link se debe usar los elemntos generadoas por angular
    const debugElement  = fixture.debugElement.query(
      By.directive(RouterLink)
    )// instancia del objeto que hace

    const routerLinkInstance = debugElement.injector.get(RouterLink)
    console.log(routerLinkInstance.urlTree?.toString())
    expect(routerLinkInstance.urlTree?.toString()).toBe(`/pokemons/${mockPokemon.name}`)
  });
});
