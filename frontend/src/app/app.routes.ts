import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { EmpresaListComponent } from './pages/empresa-list/empresa-list.component';
<<<<<<< Updated upstream


export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo: "login"},
    {path:"login", component: LoginComponent},
    {path:"dashboardAdmin", component: DashboardAdminComponent},
    {path:"categoriasList", component: CategoriaListComponent},
    {path:"categoriaNew", component: CategoriaFormComponent},
    {path:"categoriaUpdate/:id_categoria", component: CategoriaFormComponent},
    {path:"usersList", component: UserListComponent},
    {path:"empresasList", component: EmpresaListComponent},
    {path:"userNew", component: UserFormComponent},
    {path:"userUpdate/:id_user", component: UserFormComponent},
    {path:"**", redirectTo: "login"}
=======
import { AuthGuard } from './auth.guard';
import { VacanteFormEmpresaComponent } from './pages/vacante-form-empresa/vacante-form-empresa.component';
import { VacantesListClienteComponent } from './pages/vacantes-list-cliente/vacantes-list-cliente.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { SolicitudFormCliComponent } from './pages/solicitud-form-cli/solicitud-form-cli.component';
import { VacanteDetailComponent } from './pages/vacante-detail/vacante-detail.component';
import { SolicitudListEmpresaComponent } from './pages/solicitud-list-empresa/solicitud-list-empresa.component';

export const routes: Routes = [

  /** Rutas generales **/
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  /** Panel de usuario **/
  {
    path: 'dashboardAdmin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
  },
  {
    path: 'dashboardCliente',
    component: DashboardClienteComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
  },
  {
    path: 'dashboardEmpresa',
    component: DashboardEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
  },

  /** Vacantes **/
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
  
  {
    path: 'vacantesListCli',
    component: VacantesListClienteComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
  },

  {
    path: 'vacante/:id',
    component: VacanteDetailComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
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

  { path: '**', redirectTo: 'login' },
>>>>>>> Stashed changes
];
