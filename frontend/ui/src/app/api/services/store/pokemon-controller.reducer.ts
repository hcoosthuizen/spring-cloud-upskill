import {addPokemon, updatePokemon} from './pokemon-controller.actions';
import {Pokemon} from '../../models/pokemon';
import {createReducer, createSelector, on} from '@ngrx/store';

export interface AppState {
  pokemonControllerState: PokemonControllerState;
}

export interface PokemonControllerState {
  pokemonList: Pokemon[];
}

const initialState: PokemonControllerState = {
  pokemonList: [{name: 'Bulbasaur', elementalType: 'Grass'}]
};

export const selectAll = createSelector((state: AppState) => state.pokemonControllerState, pokeList => pokeList.pokemonList);

export const pokemonReducer = createReducer(
  initialState,
  on(addPokemon, (state, action) => {
    return {
      ...state,
      pokemonList: [...state.pokemonList, action.newPokemon]
    }
  }),
  on(updatePokemon, (state, action) => {
    const updatedList = state.pokemonList.map((value, i) => i === action.index ? action.updatedPokemon : value);
    return {
      ...state,
      pokemonList: updatedList
    }
  })
);
