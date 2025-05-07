import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { IEmpresa } from '../../interfaces/iempresa';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent {

  private empresaService = inject(EmpresaService);
  private route = inject(ActivatedRoute);

  empresa?: IEmpresa;
  error = "";


  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const idEmpresa = usuario?.idEmpresa || null;
  
    if (!idEmpresa) {
      this.error = "ID de empresa no válido.";
      return;
    }
  
    this.empresaService.getPerfilEmpresa(idEmpresa)
      .then(response => this.empresa = response)
      .catch(() => this.error = "Error al cargar el perfil de la empresa");
  }
  
}