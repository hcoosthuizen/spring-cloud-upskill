import {addPokemonToPokemonList, fetchPokemonFromServiceSuccess, updatePokemonInPokemonList} from './pokemon-controller.actions';
import {Pokemon} from '../../models/pokemon';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

export interface PokemonControllerState {
  pokemonList: Pokemon[];
}

const initialState: PokemonControllerState = {
  pokemonList: [{name: 'Bulbasaur', elementalType: 'Grass'}]
};

export const selectAll = createFeatureSelector<PokemonControllerState>('pokemonListComponent');

export const selectPokemonList = createSelector(selectAll, (state) => state.pokemonList);

export const pokemonReducer = createReducer(
  initialState,
  on(addPokemonToPokemonList, (state, action) => {
    return {
      ...state,
      pokemonList: [...state.pokemonList, action.newPokemon]
    }
  }),
  on(updatePokemonInPokemonList, (state, action) => {
    const updatedList = state.pokemonList.map((value, i) => i === action.index ? action.updatedPokemon : value);
    return {
      ...state,
      pokemonList: updatedList
    }
  }),
  on(fetchPokemonFromServiceSuccess, (state, action) => {
    console.log("ReducerSuccess")
    console.dir(action.resultList);
    return {
      ...state,
      pokemonList: action.resultList
    }
  })
);
