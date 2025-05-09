import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
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
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { VacanteFormEmpresaComponent } from './pages/vacante-form-empresa/vacante-form-empresa.component';
import { VacantesListClienteComponent } from './pages/vacantes-list-cliente/vacantes-list-cliente.component';
import { VacantesListComponent } from './pages/vacantes-list/vacantes-list.component';
import { SolicitudFormCliComponent } from './pages/solicitud-form-cli/solicitud-form-cli.component';
import { SolicitudListEmpresaComponent } from './pages/solicitud-list-empresa/solicitud-list-empresa.component';
import { SolicitudesListClienteComponent } from './pages/solicitudes-list-cliente/solicitudes-list-cliente.component';
import { EmpresaAdminListComponent } from './pages/empresa-admin-list/empresa-admin-list.component';
import { EmpresaAdminFormComponent } from './pages/empresa-admin-form/empresa-admin-form.component';
import { SolicitudDetailEmpresaComponent } from './pages/solicitud-detail-empresa/solicitud-detail-empresa.component';
import { VacanteDetailEmpresaComponent } from './pages/vacante-detail-empresa/vacante-detail-empresa.component';
import { PerfilEmpresaComponent } from './pages/perfil-empresa/perfil-empresa.component';
import { PerfilFormComponent } from './pages/perfil-form/perfil-form.component';

export const routes: Routes = [

  /** Rutas públicas **/
  { path: '', pathMatch: 'full', component: HomeComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  /** Admin **/
  {
    path: 'dashboardAdmin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: { rol: ['ADMON'] },
    children: [
      { path: '', redirectTo: 'usersList', pathMatch: 'full' },
      { path: 'usersList', component: UserListComponent },
      { path: 'userNew', component: UserFormComponent },
      { path: 'userUpdate/:email', component: UserFormComponent },
      { path: 'categoriasList', component: CategoriaListComponent },
      { path: 'categoriaNew', component: CategoriaFormComponent },
      { path: 'categoriaUpdate/:id_categoria', component: CategoriaFormComponent },
      { path: 'empresasAdminList', component: EmpresaAdminListComponent },
      { path: 'empresaAdminNew', component: EmpresaAdminFormComponent },
      { path: 'empresaAdminUpdate/:id_empresa', component: EmpresaAdminFormComponent }
    ]
  },

  /** Cliente **/
  {
    path: 'dashboardCliente',
    component: DashboardClienteComponent,
    canActivate: [AuthGuard],
    data: { rol: ['CLIENTE'] },
    children: [
      { path: '', redirectTo: 'vacantesListCli', pathMatch: 'full' },
      { path: 'vacantesListCli', component: VacantesListClienteComponent },
      { path: 'solicitudesCliList', component: SolicitudesListClienteComponent },
      { path: 'solicitudNew/:id_vacante', component: SolicitudFormCliComponent }
    ]
  },

  /** Empresa **/
  {
    path: 'dashboardEmpresa',
    component: DashboardEmpresaComponent,
    canActivate: [AuthGuard],
    data: { rol: ['EMPRESA'] },
    children: [
      { path: '', redirectTo: 'vacantesList', pathMatch: 'full' },
      { path: 'vacantesList', component: VacantesListComponent },
      { path: 'vacanteNew', component: VacanteFormEmpresaComponent },
      { path: 'vacanteDetail/:idVacante', component: VacanteDetailEmpresaComponent },
      { path: 'editarVacante/:idVacante', component: VacanteFormEmpresaComponent },
      { path: 'solicitudesList', component: SolicitudListEmpresaComponent },
      { path: 'solicitudes/:idVacante', component: SolicitudListEmpresaComponent },
      { path: 'solicitudDetail/:idSolicitud', component: SolicitudDetailEmpresaComponent },
      { path: 'perfilEmpresa', component: PerfilEmpresaComponent },
      { path: 'perfilForm', component: PerfilFormComponent }
    ]
  },


  { path: '**', redirectTo: 'home' }
];
