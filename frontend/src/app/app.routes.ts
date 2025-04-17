import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';


export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo: "login"},
    {path:"login", component: LoginComponent},
    {path:"dashboardAdmin", component: DashboardAdminComponent},
    {path:"categoriasList", component: CategoriaListComponent},
    {path:"**", redirectTo: "login"}
];
