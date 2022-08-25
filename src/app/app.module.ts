import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { BrowserModule } from '@angular/platform-browser';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { AppRoutingModule } from './app-routing.module';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';

// Initialize Firebase
const firebaseApp = initializeApp(environment.firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AngularFirestoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
