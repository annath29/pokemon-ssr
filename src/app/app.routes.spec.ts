import { Location } from '@angular/common';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import AboutPage from './pages/about/about-page';
import PokemonsPage from './pages/pokemons/pokemons-page';
import PricingPage from './pages/pricing/pricing-page';

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

  });

  it('should be defined', () => {
    // console.log('routed', routes);
    expect(routes).toBeDefined();
  });
  
  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined(); // tiene que existir

    const component = await (aboutRoute.loadComponent!()) as any; //carga el componente 
    expect(component.default).toBe(AboutPage);

  });

  it('should navigate to "/about" when default path is set', async () => {
    await router.navigate(['/']); // si pongo una ruta incorrecta debe ren
    // console.log("location preview",location.path());
    expect( location.path()).toBe('/about')
  });
  
  it('should render PricingPageComponent when path is /pricing', async () => {
    const pricingRoute = routes.find((route) => route.path === 'pricing')!;
    expect(pricingRoute).toBeDefined(); // tiene que existir

    const component = await (pricingRoute.loadComponent!()) as any; //carga el componente 
    expect(component.default).toBe(PricingPage);
  });
  it('should navigate to  path is /pricing', async () => {
    await router.navigate(['/pricing']);
    // console.log("actual location",location.path());
    expect( location.path()).toBe('/pricing')
    expect
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1'])
    expect(location.path()).toBe('/pokemons/page/1')
  });
  
  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const pokemonRoute = routes.find(route => route.path === 'pokemons/page/:page')!;
    expect(pokemonRoute).toBeDefined()

    const component = await (pokemonRoute.loadComponent!()) as any;
    expect(component.default).toBe(PokemonsPage)
  });

  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['/pricingdd']); // si pongo una ruta incorrecta debe ren
    // console.log("location preview",location.path());
    expect( location.path()).toBe('/about')
  });
});
