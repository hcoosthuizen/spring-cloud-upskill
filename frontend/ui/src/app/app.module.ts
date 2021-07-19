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
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {rxStompConfig} from './rx-stomp.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {POKEMON_LIST_FEATURE} from './api/services/store/features';

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
    StoreModule.forFeature(POKEMON_LIST_FEATURE, pokemonReducer),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    EffectsModule.forRoot([PokemonControllerEffects]),
    NgbModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
