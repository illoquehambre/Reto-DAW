import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardClienteComponent } from './pages/dashboard-cliente/dashboard-cliente.component';
import { DashboardEmpresaComponent } from './pages/dashboard-empresa/dashboard-empresa.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { VacanteFormComponent } from './pages/vacante-form/vacante-form.component';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { EmpresaListComponent } from './pages/empresa-list/empresa-list.component';
import { AuthGuard } from './auth.guard';
import { VacanteFormEmpresaComponent } from './pages/vacante-form-empresa/vacante-form-empresa.component';

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
    data: { rol: ['ADMIN'] },
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
    data: { rol: ['CLIENTE', 'EMPRESA'] },
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
    data: { rol: ['ADMIN'] },
  },

  {
    path: 'categoriasList',
    component: CategoriaListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  
  {
    path: 'categoriaUpdate/:id_categoria',
    component: CategoriaFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },

  /** Usuarios **/
  {
    path: 'userNew',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },

  {
    path: 'usersList',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  
  {
    path: 'userUpdate/:email',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },

  /** Empresas **/
  {
    path: 'empresasList',
    component: EmpresaListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },

  { path: '**', redirectTo: 'login' },
];
