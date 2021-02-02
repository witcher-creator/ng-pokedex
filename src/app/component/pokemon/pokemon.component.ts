import { Component, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/shared/Pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemonList?: IPokemon[];
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  limit = 50;
  offset = 0;
  constructor(private pokeService: PokemonService) { }

  getPokemonList(): void {
    this.pokeService.findAll(this.limit, this.offset).subscribe(res => this.pokemonList = res);
  }

  ngOnInit(): void {
    this.getPokemonList();
  }

  trackId(index, item) {
    return index;
  }

  sortByName(): void {
    if(this.pokemonList){
      this.pokemonList.sort((a, b) => {
        const aName=a.name.toLowerCase(), bName=b.name.toLowerCase();
        if(aName < bName){
          return -1;
        }
        if(aName > bName){
          return 1;
        }
        return 0;
      })
    }
  }

  onScrollDown(): void {
    console.log("down");
    this.offset = this.limit;
    this.limit = this.limit + 50;
    console.log(this.offset + " and " + this.limit);
    this.getPokemonList();
  }

  onUp(): void {
    console.log("up");
    if(this.offset >= 50){
      this.limit = this.offset;
      this.offset = this.limit - 50;
      console.log(this.offset + " and " + this.limit);
      this.getPokemonList(); 
    }
    
  }
}
