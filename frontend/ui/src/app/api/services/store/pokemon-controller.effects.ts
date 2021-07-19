import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetchAllPokemonFromService, fetchAllPokemonFromServiceSuccess} from './pokemon-controller.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PokemonControllerService} from '../pokemon-controller.service';
import {EMPTY} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class PokemonControllerEffects {
  fetchAllPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllPokemonFromService),
      mergeMap(() => this.pokemonControllerService.getAllPokemon().pipe(
        map(pokemon => fetchAllPokemonFromServiceSuccess({resultList: pokemon})),
        catchError(() => EMPTY)
      ))
    ));

  constructor(private actions$: Actions, private pokemonControllerService: PokemonControllerService) {
  }
}
