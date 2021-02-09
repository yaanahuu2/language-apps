import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {"path": "menu","component": MenuComponent },
  {"path": "detail/:id", "component": DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
