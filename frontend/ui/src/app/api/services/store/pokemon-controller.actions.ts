import {createAction, props} from '@ngrx/store';
import {Pokemon} from '../../models/pokemon';

export const addPokemon = createAction(
  'ADD_POKEMON',
  props<{ newPokemon: Pokemon }>()
)

export const updatePokemon = createAction(
  'UPDATE_POKEMON',
  props<{ updatedPokemon: Pokemon, index: number }>()
)
