// app-routing.module.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardClienteComponent } from './pages/dashboard-cliente/dashboard-cliente.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { EmpresaListComponent } from './pages/empresa-list/empresa-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
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
    path: 'vacantesList',
    component: VacantesListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
  },
  {
    path: 'categoriasList',
    component: CategoriaListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  {
    path: 'categoriaNew',
    component: CategoriaFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  {
    path: 'categoriaUpdate/:id_categoria',
    component: CategoriaFormComponent,
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
    path: 'empresasList',
    component: EmpresaListComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  {
    path: 'userNew',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  {
    path: 'userUpdate/:email',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMIN'] },
  },
  { path: '**', redirectTo: 'login' },
];
