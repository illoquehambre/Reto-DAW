import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ILogin } from '../../interfaces/ilogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  UserService = inject(UserService);
  router = inject(Router);

  async getUser(loginForm: NgForm){
    const loginUser: ILogin = loginForm.value as ILogin;
    //console.log(loginUser);

    try{
      let response = await this.UserService.login(loginUser);

      if (response){
        this.router.navigate(['/dashboardAdmin']);
      }
      //console.log(response);
    }catch (err){
      alert("Username o password incorrectos");
      loginForm.reset();
    }
  }
}
