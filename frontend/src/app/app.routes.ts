import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';


export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo: "login"},
    {path:"login", component: LoginComponent},
    {path:"dashboardAdmin", component: DashboardAdminComponent},
    {path:"categoriasList", component: CategoriaListComponent},
    {path:"categoriaNew", component: CategoriaFormComponent},
    {path:"categoriaUpdate/:id_categoria", component: CategoriaFormComponent},
    {path:"usersList", component: UserListComponent},
    {path:"userNew", component: UserFormComponent},
    {path:"userUpdate/:id_user", component: UserFormComponent},
    {path:"**", redirectTo: "login"}
];
