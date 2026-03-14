import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonList } from './pokemon-list';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasur',
  },
  {
    name: 'pikachu',
    id: '10',
  },
];

describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;
    //valores de inputs
    // fixture.componentRef.setInput('pokemon',mockPokemon)
    fixture.componentRef.setInput('pokemons', mockPokemons);
    await fixture.whenStable();
  });

  it('should create', () => {
    // console.log(fixture.nativeElement.innerHTML);
    expect(component).toBeTruthy();
  });
  it('should render pokemon list', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const component = compiled.querySelectorAll('pokemon-card');

    expect(component).toBeTruthy();
    expect(component.length).toBe(mockPokemons.length);
    // expect(component.length).toBe(3);
  });
  it('should render "no hay pokemons" when list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // console.log('object', compiled.innerHTML);
    
    const message = compiled.querySelector('div.col-span-5');
    expect(message).toBeTruthy();
    expect(message?.textContent.trim()).toBe('No hay pokemons disponibles');
  });
});
