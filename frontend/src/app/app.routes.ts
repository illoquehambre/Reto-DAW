import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardClienteComponent } from './pages/dashboard-cliente/dashboard-cliente.component';
import { DashboardEmpresaComponent } from './pages/dashboard-empresa/dashboard-empresa.component';
import { VacanteFormComponent } from './pages/vacante-form/vacante-form.component';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { EmpresaListComponent } from './pages/empresa-list/empresa-list.component';
import { AuthGuard } from './auth.guard';
import { VacanteFormEmpresaComponent } from './pages/vacante-form-empresa/vacante-form-empresa.component';
import { VacantesListClienteComponent } from './pages/vacantes-list-cliente/vacantes-list-cliente.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { SolicitudFormCliComponent } from './pages/solicitud-form-cli/solicitud-form-cli.component';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { SolicitudListEmpresaComponent } from './pages/solicitud-list-empresa/solicitud-list-empresa.component';
import { VacanteDetailEmpresaComponent } from './pages/vacante-detail-empresa/vacante-detail-empresa.component';
import { PerfilEmpresaComponent } from './pages/perfil-empresa/perfil-empresa.component';

export const routes: Routes = [

  /** Rutas generales **/
  { path: '', pathMatch: 'full', component:HomeComponentComponent },
  { path: 'home', pathMatch: 'full', component:HomeComponentComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  /** Panel de usuario **/
  {
    path: 'dashboardAdmin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
    children: [
      { path: 'usersList', component: UserListComponent },
      { path: 'categoriasList', component: CategoriaListComponent },
    ]
  },
  {
    path: 'dashboardCliente',
    component: DashboardClienteComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
    children: [
      {
        path: 'vacantesListCli',
        component: VacantesListClienteComponent,
        canActivate: [AuthGuard],
        data: { rol: ['CLIENTE'] },
      },
      {
        path: '',
        component: VacantesListClienteComponent,
        canActivate: [AuthGuard],
        data: { rol: ['CLIENTE'] },
      }
    ]
  },
  {
    path: 'dashboardEmpresa',
    component: DashboardEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
    children: [
      {
        path: 'vacanteNew',
        component: VacanteFormEmpresaComponent,
        canActivate: [AuthGuard],
        data: { rol: ['EMPRESA'] },
      },
      {
        path: 'vacantesList',
        component: VacantesListComponent,
        canActivate: [AuthGuard],
        data: { rol: ['EMPRESA'] },
      },
     
    ]
  },

  /** Vacantes **/
  {
    path: 'vacanteNew',
    component: VacanteFormEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },

  {
    path: 'editarVacante/:idVacante',
    component: VacanteFormEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },

  {
    path: 'vacante/:id',
    component: VacanteDetailEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },

  {
    path: 'vacantesList',
    component: VacantesListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },
  
  {
    path: 'vacantesListCli',
    component: VacantesListClienteComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
  },

  {
    path: 'vacanteDetalle/:id_vacante',
    component: VacanteFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
  },

  /** Categorias **/

  {
    path: 'categoriaNew',
    component: CategoriaFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },

  {
    path: 'categoriasList',
    component: CategoriaListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },
  
  {
    path: 'categoriaUpdate/:id_categoria',
    component: CategoriaFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },

  /** Usuarios **/
  {
    path: 'userNew',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },

  {
    path: 'usersList',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },
  
  {
    path: 'userUpdate/:email',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },

  /** Empresas **/
  {
    path: 'perfilEmpresa',
    component: PerfilEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },

  {
    path: 'empresasList',
    component: EmpresaListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },

  /** Solicitudes **/
  {
    path: 'solicitudNew',
    component: SolicitudFormCliComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
  },

  {
    path: 'solicitudes/:idVacante',
    component: SolicitudListEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },

  { path: '**', redirectTo: 'home' },
];
