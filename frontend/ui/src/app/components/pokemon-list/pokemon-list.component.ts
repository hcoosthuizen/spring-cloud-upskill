import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../api/models/pokemon';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {AppState, selectAll} from '../../api/services/store/pokemon-controller.reducer';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemon: Observable<Pokemon[]>;

  constructor(private store: Store<AppState>) {
    this.pokemon = of()
  }

  ngOnInit(): void {
    this.pokemon = this.store.select(selectAll);
  }
}
