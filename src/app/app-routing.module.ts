import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {DashboardComponent} from "./components/AdminComponents/dashboard/dashboard.component";
import {UserDashboardComponent} from "./components/NormalUserComponents/user-dashboard/user-dashboard.component";
import {AdminGuard} from "./services/admin.guard";
import {NormalGuard} from "./services/normal.guard";
import {PerfileComponent} from "./components/AdminComponents/perfile/perfile.component";
import {PerfileNormalUserComponent} from "./components/NormalUserComponents/perfile-normal-user/perfile-normal-user.component";
import {VacacionesDashComponent} from "./components/NormalUserComponents/vacaciones-normal-dash/vacaciones-dash.component";
import {InicioNormalComponent} from "./components/NormalUserComponents/inicio-normal/inicio-normal.component";
import {VacacionesAdminDashComponent} from "./components/AdminComponents/vacaciones-admin-dash/vacaciones-admin-dash.component";
import {UsuariosAdminDashComponent} from "./components/AdminComponents/usuarios-admin-dash/usuarios-admin-dash.component";
import {ConfiguracionesAdminDashComponent} from "./components/AdminComponents/configuraciones-admin-dash/configuraciones-admin-dash.component";
import {EditarPerfilAdminComponent} from "./components/AdminComponents/editar-perfil-admin/editar-perfil-admin.component";
import {CrearNuevoUsuarioAdminComponent} from "./components/AdminComponents/crear-nuevo-usuario-admin/crear-nuevo-usuario-admin.component";
import {InicioAdminComponent} from "./components/AdminComponents/inicio-admin/inicio-admin.component";
import {PrestamosAdminDashComponent} from "./components/AdminComponents/prestamos-admin-dash/prestamos-admin-dash.component";
import {PrestamosDashComponent} from "./components/NormalUserComponents/prestamos-normal-dash/prestamos-dash.component";
import {RecuperarPasswordComponent} from "./recuperar-password/recuperar-password.component";

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
   pathMatch : 'full',

  },
  {
    path: 'recuperar-clave',
    component: RecuperarPasswordComponent
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path: 'perfil',
        component:PerfileComponent
      },
      {
        path: 'vacaciones',
        component:VacacionesAdminDashComponent
      },
      {
        path: 'usuarios',
        component:UsuariosAdminDashComponent
      },
      {
        path: 'configuraciones',
        component:ConfiguracionesAdminDashComponent
      },
      {
        path: 'editar-perfil-admin/:id',
        component:EditarPerfilAdminComponent
      },
      {
        path: 'crear-usuario-admin',
        component:CrearNuevoUsuarioAdminComponent
      },
      {
        path: 'inicio-admin',
        component:InicioAdminComponent
      },
      {
        path: 'prestamos',
        component: PrestamosAdminDashComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    //pathMatch: 'full', remover para entra a las rutas hijas
    canActivate:[NormalGuard],
    children:[
      {
        path: 'perfil',
        component:PerfileNormalUserComponent
      },
      {
        path: 'vacaciones',
        component: VacacionesDashComponent
      },
      {
        path: 'prestamos',
        component: PrestamosDashComponent
      },
      {
        path: 'inicio',
        component: InicioNormalComponent
      }
    ]
  },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
