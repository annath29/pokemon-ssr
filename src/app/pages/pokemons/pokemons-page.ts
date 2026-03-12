import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonServices } from '../../pokemons/services/pokemon.services';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap, pipe } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage implements OnInit {
  // public isLoading = signal(true);// cuando se necesita el cargando en spa porque el ssr se envia la info antes por el oninit
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable }); // para saber cuando la app esta estable
  // });

  public currentName = signal('Andrea');

  private pokemonsServices = inject(PokemonServices);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      //si no es un numero se envia 1 si es un nuumero se envia e numero
      map((page) => (isNaN(+page) ? 1 : +page)), //el + antes de page transforma en numero, remplaza number(page)
      map((page) => Math.max(1, page)), //page solo puede estar entre 1 y pages
    ),
  );

  ngOnInit(): void {
    console.log('currentpage', this.currentPage());
    // this.route.queryParamMap.subscribe(params =>{
    //   console.log("paramas",params)
    // })//observable
    this.loadPokemons();

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    // this.currentPage.set no se puede hacer porque la señal esta basada en un observable
    // console.log({ pageToLoad, currentPage: this.currentPage() });

    this.pokemonsServices
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(` Pokemons SSR - Page ${pageToLoad}`)),
      ) //cambiar queryparams y no se recarga
      .subscribe((pokemons) => {
        // console.log('On init')
        this.pokemons.set(pokemons);
      });
  }
}
