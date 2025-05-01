import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  router = inject(Router);
  userService = inject(UserService);
  @Input() miUser!: IUser;

  editarUsuario(email: string | any){
    console.log(email);
    this.router.navigate(['/userUpdate',email]);
  }

  async eliminarUsuario(email: any, nombre: string){
    let confirmacion = confirm('¿Deseas dar de baja al usuario ' + nombre + ' realmente?');
    if (confirmacion){
  
      let response;
     try{
        response = await this.userService.delete(email);

        if (response == 1){
          alert('Se ha dado de baja correctamente al usuario');
          this.router.navigate(['/usersList']);
          location.reload();
        }/*else if (response == 2) {
          alert('No se puede eliminar una categoria con vacantes relacionadas');
        }*/
        else {
          alert('Error en la API');
        }
      }catch(err: any){
        /*if (err.status === 409) {
          alert('No se puede eliminar una categoría con vacantes relacionadas.');
        } else {
          alert('Error en la API: ' + err.message);
        }*/
        alert('Error en la API: ' + err.message);
      }
    }
  }
}
