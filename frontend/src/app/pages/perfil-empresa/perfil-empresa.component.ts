import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
import { IEmpresa } from '../../interfaces/iempresa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent {
  
  empresa?: IEmpresa;
  error = '';

  private empresaService = inject(EmpresaService);
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.cargarPerfil();
  }

  async cargarPerfil(): Promise<void> {
    try {
      
      this.empresa = await this.empresaService.getPerfilEmpresa();
    } catch (error) {
      console.error('Error cargando perfil:', error);
      this.error = 'Error al cargar el perfil de la empresa';
    }
  }

  editarPerfil(): void {
    if (this.empresa) {
      this.router.navigate(['/dashboardEmpresa/perfilForm'], {
        state: { 
          empresa: this.empresa,
          modoEdicion: true
        }
      });
    }
  }
}