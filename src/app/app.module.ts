import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { TrailerComponent } from './trailer/trailer.component';
import { CaroselloComponent } from './carosello/carosello.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UnitsComponent } from './units/units.component';
import { StripesComponent } from './stripes/stripes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    MessageFormComponent,
    FooterComponent,
    TrailerComponent,
    CaroselloComponent,
    UnitsComponent,
    StripesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SlickCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
