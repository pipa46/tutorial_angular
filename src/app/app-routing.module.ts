import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { PrestamosListComponent } from './prestamos/prestamos-list/prestamos-list.component';


const routes: Routes = [
  { path: '',redirectTo:'/games',pathMatch:'full'} ,
  { path: 'categories', component: CategoriesComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'clientes', component: ListaClientesComponent },
  { path: 'prestamos', component: PrestamosListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


