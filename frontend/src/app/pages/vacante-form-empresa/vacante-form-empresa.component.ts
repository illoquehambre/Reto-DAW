import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';
import { EmpresaService } from '../../services/empresa.service';
import { Estatus } from '../../interfaces/iestatus';
import { IVacante } from '../../interfaces/ivacante';

@Component({
  selector: 'app-vacante-form-empresa',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './vacante-form-empresa.component.html',
  styleUrls: ['./vacante-form-empresa.component.css']
})
export class VacanteFormEmpresaComponent implements OnInit {
    
  private vacanteService = inject(VacanteService);
  private empresaService = inject(EmpresaService);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  formVacante: FormGroup;
  mensaje: string = "";
  tipo!: string;
  err: string = '';

  estOptions: Estatus[] = [Estatus.CREADA, Estatus.CUBIERTA, Estatus.CANCELADA];

  constructor() {
    this.formVacante = new FormGroup({
      idVacante: new FormControl(null),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
      fecha: new FormControl('', [Validators.required]),
      salario: new FormControl('', [Validators.required, Validators.min(0)]),
      estatus: new FormControl(Estatus.CREADA),
      destacado: new FormControl(false),
      imagen: new FormControl(''),
      detalles: new FormControl('', [Validators.required]),
      idCategoria: new FormControl('', [Validators.required]),
      idEmpresa: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.ruta.params.subscribe(async (params: any) => {
      if (params.idVacante) {
        this.tipo = "Editar";
        const vacanteResponse: IVacante = await this.vacanteService.getById(params.idVacante);
        if (vacanteResponse) {
          this.formVacante.patchValue(vacanteResponse);
        }
      } else {
        this.tipo = "Crear";
      }
    });
  }

  async getDataForm() {
    if (!this.formVacante.value.idCategoria || !this.formVacante.value.idEmpresa) {
      return;
    }

    if (this.tipo === "Crear") {
      this.vacanteService.insert(this.formVacante.value)
        .then(response => this.mostrarMensaje(response, "Vacante creada"));
    } else if (this.tipo === "Editar") {
      this.vacanteService.update(this.formVacante.value)
        .then(response => this.mostrarMensaje(response, "Vacante actualizada"));
    }
  }

  async eliminarVacante() {
    const idVacante = this.formVacante.value.idVacante;
    if (!idVacante) return;

    this.vacanteService.delete(idVacante)
      .then(response => this.mostrarMensaje(response, "Vacante eliminada con éxito"));
  }

  mostrarMensaje(response: number, mensajeOk: string) {
    if (response === 1) {
      this.mensaje = mensajeOk;
      this.router.navigate(['/dashboardEmpresa']);
    }
  }

  checkControl(nombre: string, error: string): boolean {
    return this.formVacante.get(nombre)?.hasError(error) ?? false;
  }
  

  volver(): void {
    this.router.navigate(["/dashboardEmpresa"]);
  }
}

