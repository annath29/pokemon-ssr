import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonServices } from './pokemon.services';
import { PokemonApiResponse, SimplePokemon } from '../interfaces';

describe('PokemonServices', () => {
  let service: PokemonServices;
  let httpMock: HttpTestingController;

  const mockPokeApiResponse: PokemonApiResponse = {
    count: 1302,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: '',
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ],
  };

  const expectedPokemons: SimplePokemon[] = [
    { id: '1', name: 'bulbasaur' },
    { id: '2', name: 'ivysaur' },
  ];

  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting()] });
    service = TestBed.inject(PokemonServices);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should load a page of pokemons', () => {
    //esta llamada no  usa internet, HttpTestingController simula la api
    service.loadPage(1).subscribe((pokemons) => {
      //llamo al servicio
      console.log({ pokemons });
      expect(pokemons).toEqual(expectedPokemons); // se verifica que lo que devuelve el servicio sea lo que se esperaba
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`); /// verifica que la llamda a esta url exista
    expect(req.request.method).toBe('GET'); //consirma que sea un servicio get y no post,put,etc
    req.flush(mockPokeApiResponse); // no llama directamente al servidoe si no al mock que se creo arriba y ejecut a el suscribe
  });

  it('should load page 5 of pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    const pokemonId = '1';
    service.loadPokemonById(pokemonId).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a pokemon by Name', () => {
    const pokemonName = 'bulbasaur';
    service.loadPokemonById(pokemonName).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    const pokemonName = 'bulbasaur';
    service.loadPokemonById(pokemonName).subscribe({
      next: () => {
        //nunca deberia suceder
        throw new Error('should have failed with 404 error');
      },
      error: (error) => {
        console.log({ error });
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('pokemon not  found');
      },
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    // expect(req.request.method).toBe('GET');
    req.flush('404 error', { status: 404, statusText: 'pokemon not  found' });// el servicio siempre falla porque estoy simulando que falle siempre
  });
});
