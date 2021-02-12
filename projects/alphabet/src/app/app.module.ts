import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { MenuComponent } from '@src/app/pages/menu/menu.component';
import { TileComponent } from '@src/app/widgets/tile/tile.component';
import { DetailComponent } from '@src/app/pages/detail/detail.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { CreditsComponent } from '@src/app/pages/credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TileComponent,
    DetailComponent,
    HomeComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
