import { Routes } from '@angular/router';
import { CreditsComponent } from './pages/credits/credits.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
  {"path": "", "component": HomeComponent },
  {"path": "menu", "component": MenuComponent },
  {"path": "detail/:id", "component": DetailComponent},
  {"path": "credits", "component": CreditsComponent }
];