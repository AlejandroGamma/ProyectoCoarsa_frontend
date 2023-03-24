import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './components/home/home.component';
import {authInterceptorProviders} from "./services/auth.interceptor";
import { DashboardComponent } from './components/AdminComponents/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/NormalUserComponents/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './components/AdminComponents/sidebar/sidebar.component';
import { PerfileComponent } from './components/AdminComponents/perfile/perfile.component';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { SidebarNormalUserComponent } from './components/NormalUserComponents/sidebar-normal-user/sidebar-normal-user.component';
import { PerfileNormalUserComponent } from './components/NormalUserComponents/perfile-normal-user/perfile-normal-user.component';
import {MatStepperModule} from '@angular/material/stepper';
import { VacacionesDashComponent } from './components/NormalUserComponents/vacaciones-normal-dash/vacaciones-dash.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { InicioNormalComponent } from './components/NormalUserComponents/inicio-normal/inicio-normal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { VacacionesAdminDashComponent } from './components/AdminComponents/vacaciones-admin-dash/vacaciones-admin-dash.component';
import { UsuariosAdminDashComponent } from './components/AdminComponents/usuarios-admin-dash/usuarios-admin-dash.component';
import { ConfiguracionesAdminDashComponent } from './components/AdminComponents/configuraciones-admin-dash/configuraciones-admin-dash.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditarPerfilAdminComponent } from './components/AdminComponents/editar-perfil-admin/editar-perfil-admin.component';
import { CrearNuevoUsuarioAdminComponent } from './components/AdminComponents/crear-nuevo-usuario-admin/crear-nuevo-usuario-admin.component';
import { InicioAdminComponent } from './components/AdminComponents/inicio-admin/inicio-admin.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
    PerfileComponent,
    SidebarNormalUserComponent,
    PerfileNormalUserComponent,
    VacacionesDashComponent,
    InicioNormalComponent,
    VacacionesAdminDashComponent,
    UsuariosAdminDashComponent,
    ConfiguracionesAdminDashComponent,
    EditarPerfilAdminComponent,
    CrearNuevoUsuarioAdminComponent,
    InicioAdminComponent


  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatMenuModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatSelectModule


  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
