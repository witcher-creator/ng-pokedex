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
  
  constructor(private pokeService: PokemonService) { }

  getPokemonList(): void {
    this.pokeService.findAll().subscribe(res => this.pokemonList = res);
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
}
