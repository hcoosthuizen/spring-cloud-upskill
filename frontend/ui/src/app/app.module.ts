import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {PokemonListComponent} from './components/pokemon-list/pokemon-list.component';
import {appReducer} from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PokemonControllerEffects} from './api/services/store/pokemon-controller.effects';
import {pokemonReducer} from './api/services/store/pokemon-controller.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreModule.forFeature('pokemonListComponent', pokemonReducer),
    EffectsModule.forRoot([PokemonControllerEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
