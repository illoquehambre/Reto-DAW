import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  router = inject(Router);
  arrUsers: IUser[];
  userService = inject(UserService);

  constructor(){
    this.arrUsers = [];
  }

  async ngOnInit(): Promise<void>{
    try{
      this.arrUsers = await this.userService.getAll();
    }catch(err){
      alert('Error al conectar a la API: ' + err);
    }
  }

  nuevoUser(){
    this.router.navigate(['/dashboardAdmin/userNew']);
  }

  volver(){
    this.router.navigate(['/dashboardAdmin']);
  }
}
