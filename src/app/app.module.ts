import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {ComputerComponent} from './computer/computer.component';
import {GameService} from './services/game.service';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    ComputerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AsyncLocalStorageModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
