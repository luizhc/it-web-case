import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { GlobalEffects } from './state/global.effects';
import { GlobalFacade } from './state/global.facade';
import { globalFeatureKey, globalReducer } from './state/global.reducer';

registerLocaleData(localePt);

const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({
    keys: [
      {
        'expense-list': ['expenseSelected'],
      },
    ],
    rehydrate: true,
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    PagesModule,
    SharedModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    // NgRx
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(globalFeatureKey, globalReducer),
    EffectsModule.forFeature([GlobalEffects]),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, GlobalFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
