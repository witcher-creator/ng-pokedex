import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './component/pokemon/pokemon-detail.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';

const routes: Routes = [
  {path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  {path: 'pokemon', component: PokemonComponent},
  {path: 'pokemon/:id', component: PokemonDetailComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
