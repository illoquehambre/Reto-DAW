import { Component } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  user: IUser | null = null;
  solicitudesTotales: number | null = null;

  constructor(private userService:UserService,public authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(
      {
        next: u => this.user = u,
      error: () => this.user = null
      }
    )

}

}
