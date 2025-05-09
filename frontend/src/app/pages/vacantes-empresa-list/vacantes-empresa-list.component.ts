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
    console.log("iniciando")
    const email = this.authService.getCurrentUserEmail();
    console.log("email o nullo?: ",email)
    if (!email) {
      this.errorMsg = 'No hay usuario autenticado.';
      return;
    }
    console.log("email empresa: ", email)

    this.empresaService.findByEmail(email)
      .then((empresa: IEmpresa) => {
        if (empresa.idEmpresa != null) {
          this.loadVacantes(empresa.idEmpresa);
          console.log("idEmpresa ",empresa.idEmpresa)
        } else {
          console.error('Empresa recuperada sin ID:', empresa);
          this.errorMsg = 'La empresa no tiene un identificador válido.';
        }
      })
      .catch(err => {
        console.error('Error al cargar empresa:', err);
        this.errorMsg = 'No se pudo recuperar la empresa.';
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
