import {addPokemonToPokemonList, fetchAllPokemonFromServiceSuccess, updatePokemonInPokemonList} from './pokemon-controller.actions';
import {Pokemon} from '../../models/pokemon';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {POKEMON_LIST_FEATURE} from './features';

export interface PokemonControllerState {
  pokemonList: Pokemon[];
}

const initialState: PokemonControllerState = {
  pokemonList: []
};

export const selectForPokemonList = createFeatureSelector<PokemonControllerState>(POKEMON_LIST_FEATURE);

export const selectAllPokemon = createSelector(selectForPokemonList, (state) => state.pokemonList);

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
  on(fetchAllPokemonFromServiceSuccess, (state, action) => {
    return {
      ...state,
      pokemonList: action.resultList
    }
  })
);
