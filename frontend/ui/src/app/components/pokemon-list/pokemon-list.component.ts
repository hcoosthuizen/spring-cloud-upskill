import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../../api/models/pokemon';
import {Store} from '@ngrx/store';
import {Observable, of, Subscription} from 'rxjs';
import {selectAllPokemon} from '../../api/services/store/pokemon-controller.reducer';
import {AppState} from '../../store/app.reducer';
import {addPokemonToPokemonList, fetchAllPokemonFromService} from '../../api/services/store/pokemon-controller.actions';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemon: Observable<Pokemon[]>;

  constructor(private store: Store<AppState>, private stompService: RxStompService) {
    this.pokemon = of();
  }

  private webSocketSubscription: Subscription | undefined;
  messages: string[] = [];

  ngOnInit(): void {
    this.store.dispatch(fetchAllPokemonFromService({}));
    this.pokemon = this.store.select(selectAllPokemon);
    this.webSocketSubscription = this.stompService.watch('/notifications/discoveries').subscribe((message) => {
      let pokemon: Pokemon = JSON.parse(message.body);
      console.log(`Received: ${pokemon}`)
      this.messages.push(`New pokemon discovered: ${pokemon.name}`)
      this.store.dispatch(addPokemonToPokemonList({newPokemon: pokemon}));
    });
  }

  ngOnDestroy(): void {
    this.webSocketSubscription?.unsubscribe();
  }

  close(message: string) {
    let index = this.messages.indexOf(message);
    this.messages.slice(index, index);
  }
}
