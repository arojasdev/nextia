import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ArchivosComponent } from './pages/admin/archivos/archivos.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './pages/admin/editar-usuario/editar-usuario.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path: 'usuarios',
        component:UsuariosComponent
      },
      {
        path: '',
        component:WelcomeComponent
      },
      {
        path:'editar-usuario/:idUsuario',
        component:EditarUsuarioComponent
      },
      {
        path: 'archivos',
        component:ArchivosComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }