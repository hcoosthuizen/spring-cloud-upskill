import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../models/pokemon';

export const addPokemonToPokemonList = createAction(
  '[Pokemon List] ADD_POKEMON',
  props<{ newPokemon: Pokemon }>()
)

export const updatePokemonInPokemonList = createAction(
  '[Pokemon List] UPDATE_POKEMON',
  props<{ updatedPokemon: Pokemon, index: number }>()
)

export const fetchAllPokemonFromService = createAction(
  '[Pokemon List] REQUEST_POKEMON_LIST',
  props<any>()
)
export const fetchAllPokemonFromServiceSuccess = createAction(
  '[Pokemon List] REQUEST_POKEMON_LIST_SUCCESS',
  props<{ resultList: Pokemon[] }>()
)
