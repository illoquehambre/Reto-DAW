import { Component, OnInit } from '@angular/core';
import { IVacante } from '../../interfaces/ivacante';
import { VacanteService } from '../../services/vacante.service';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { IEmpresa } from '../../interfaces/iempresa';
import { VacanteCardComponent } from "../../components/vacante-card/vacante-card.component";

@Component({
  selector: 'app-vacantes-empresa-list',
  standalone: true,
  imports: [VacanteCardComponent],
  templateUrl: './vacantes-empresa-list.component.html',
  styleUrl: './vacantes-empresa-list.component.css'
})
export class VacantesEmpresaListComponent implements OnInit{
  vacantesByEmpresa: IVacante[] = [];
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
  this.empresaService.getVacantesByUsuario().subscribe({
    next: vacs => {
      this.vacantesByEmpresa = vacs;
      console.log("Vacantes cargadas:", vacs);
    },
    error: err => {
      console.error('Error al cargar vacantes:', err);
      this.errorMsg = 'No se pudieron cargar las vacantes.';
    }
  });
}

  private loadVacantes(idEmpresa: number) {
    this.empresaService.getVacantesByEmpresa(idEmpresa).subscribe({
      next: vacs => this.vacantesByEmpresa = vacs,
      error: err => {
        console.error('Error al cargar vacantes:', err);
        this.errorMsg = 'No se pudieron cargar las vacantes.';
      }
    });
  }
}

