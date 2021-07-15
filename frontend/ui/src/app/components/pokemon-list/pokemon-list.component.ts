import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../api/models/pokemon';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {selectPokemonList} from '../../api/services/store/pokemon-controller.reducer';
import {AppState} from '../../store/app.reducer';
import {fetchPokemonFromService} from '../../api/services/store/pokemon-controller.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemon: Observable<Pokemon[]>;

  constructor(private store: Store<AppState>) {
    this.pokemon = of();
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPokemonFromService({}));
    this.pokemon = this.store.select(selectPokemonList);
  }
}
