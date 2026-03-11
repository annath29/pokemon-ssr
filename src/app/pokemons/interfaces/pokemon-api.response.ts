export interface PokemonApiResponse {
    count:number;
    next: string;
    previoud: string;
    results:Result[];
}

export interface Result{
    name: string;
    url:string;

}