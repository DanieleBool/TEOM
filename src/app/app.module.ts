import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { CardsComponent } from './cards/cards.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { FooterComponent } from './footer/footer.component';
import { FooterHeroComponent } from './footer-hero/footer-hero.component';
import { FormsModule } from '@angular/forms';
import { TrailerComponent } from './trailer/trailer.component';
import { CaroselloComponent } from './carosello/carosello.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    CardsComponent,
    MessageFormComponent,
    FooterComponent,
    FooterHeroComponent,
    TrailerComponent,
    CaroselloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
