import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IPokemon } from "src/app/shared/Pokemon";
import { PokemonService } from "./pokemon.service";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: IPokemon;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private location: Location){}

  getPokemon(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokeService.find(id).subscribe(res => this.pokemon = res);
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  goBack(): void {
    this.location.back();
  }

  toString() {
    return JSON.stringify(this.pokemon);
  }
}