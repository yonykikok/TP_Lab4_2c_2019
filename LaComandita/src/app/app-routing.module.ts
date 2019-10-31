import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { MenuComponent } from 'src/app/componentes/menu/menu.component';
import { ListaDeComidasComponent } from 'src/app/componentes/lista-de-comidas/lista-de-comidas.component';
import { HomeComponent } from 'src/app/componentes/home/home.component';
import { PrincipalComponent } from 'src/app/componentes/principal/principal.component';
import { BartenderComponent } from 'src/app/componentes/bartender/bartender.component';
import { CerveceroComponent } from 'src/app/componentes/cervecero/cervecero.component';
import { CocineroComponent } from 'src/app/componentes/cocinero/cocinero.component';
import { MozoComponent } from 'src/app/componentes/mozo/mozo.component';

const routes: Routes = [{ path: "login", component: LoginComponent },
{ path: "", component: HomeComponent },
 { path: "home", component: HomeComponent },
// {
//   path: "menu", component: MenuComponent, children: [
//     { path: "bebidas", component: ListaDeBebidasComponent },
//     { path: "tragos", component: ListaDeTragosComponent },
//     { path: "comidas", component: ListaDeComidasComponent },
//     { path: "postres", component: ListaDePostresComponent },
//   ],
// },
{ path: "comidas", component: ListaDeComidasComponent },
{ path: "Principal", component: PrincipalComponent },
{ path: "bartender", component: BartenderComponent },
{ path: "cervecero", component: CerveceroComponent },
{ path: "cocinero", component: CocineroComponent },
{ path: "mozo", component: MozoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
