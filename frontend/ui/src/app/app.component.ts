import {Component, OnInit} from '@angular/core';
import {Pokemon} from './api/models/pokemon';
import {Observable} from 'rxjs';
import {PokemonControllerService} from './api/services/pokemon-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngui';
  pokemon: Observable<Array<Pokemon>>;

  constructor(private pokemonService: PokemonControllerService) {
    this.pokemon = this.pokemonService.getAllPokemon();
    this.pokemon.subscribe();
  }

  ngOnInit(): void {

  }
}
