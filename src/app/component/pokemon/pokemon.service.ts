import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { IPokemon, Pokemon } from "src/app/shared/Pokemon";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseURL = 'https://pokeapi.co/api/v2';
  private spriteBaseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  private _detailRegex = /^https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\/$/;

  constructor(private http: HttpClient){}

  getEntry(data): Pokemon {
    const matches = this._detailRegex.exec(data.url);
    const id = matches == null? null : parseInt(matches[1]);
    const photoURL = id == null? undefined : `${this.spriteBaseURL}/${id}.png`;
    return new Pokemon(id, data.name, photoURL);
  }

  findAll(limit = 100, offset = 0): Observable<IPokemon[]>{
    return this.http
    .get<any>(`${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`)
    .pipe(
      map(res => res.results.map(data => this.getEntry(data))),
      catchError(this.handleError<IPokemon[]>('getPokemonList', []))
    );
  }

  find(id: number): Observable<IPokemon>{
    return this.http.get<any>(`${this.baseURL}/pokemon/${id}`)
    .pipe(
      map((res) => {
        const photoURL = `${this.spriteBaseURL}/${id}.png`;
        const name = res.name;
        const abilities = res.abilities.map(data => data.ability.name);
        const height = res.height;
        const weight = res.weight;
        const types: any[] = res.types.map(data => data.type.name);
        return new Pokemon(id, name, photoURL, height, weight, types, abilities);
      }),
      catchError(this.handleError<IPokemon>('getPokemonById', undefined))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}