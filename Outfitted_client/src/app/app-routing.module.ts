import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FuncionamientoComponent } from './funcionamiento/funcionamiento.component';
import { ClosetsListComponent } from './closets-list/closets-list.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { ClosetComponent } from './closet/closet.component';
import { PrendaListComponent } from './prenda-list/prenda-list.component';
import { PrendaCreateComponent } from './prenda-create/prenda-create.component';
import { OutfitListComponent } from './outfit-list/outfit-list.component';
import { PrendaEditComponent } from './prenda-edit/prenda-edit.component';

const routes: Routes = [

  //rutas visibles sin hacer login
  {path:'inicio', component: InicioComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'funcionamiento', component: FuncionamientoComponent},
  

  //protegidas
  
  {path:'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},


  //closets
  {path:'closets-list', component: ClosetsListComponent, canActivate: [AuthGuard]},
  {path:'closet/:id', component: ClosetComponent, canActivate: [AuthGuard]},
  //{path:'closet-create', component: ClosetCreateComponent, canActivate: [AuthGuard]},

  //prendas
  {path:'prenda-list', component: PrendaListComponent, canActivate: [AuthGuard]},
  {path:'closet/:id/prenda-create', component: PrendaCreateComponent, canActivate: [AuthGuard]},
  {path: 'prenda-edit/:id', component: PrendaEditComponent, canActivate: [AuthGuard] },


  //outfits
  {path:'outfit-list', component: OutfitListComponent, canActivate: [AuthGuard]},


  {path:'', redirectTo:'inicio', pathMatch: 'full'},
  {path:'**', redirectTo:'inicio', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
