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
  error: string = '';

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

  async ngOnInit(): Promise<void> {
    //obtener idEmpresa
    const email = localStorage.getItem('email');
    if (email) {
      const empresa = await this.empresaService.findByEmail(email);
      if (empresa?.idEmpresa) {
        this.formVacante.patchValue({ idEmpresa: empresa.idEmpresa });
      }
    }


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
    if (this.formVacante.invalid) {
      this.error = "Faltan campos por completar.";
      return;
    }

    try {
      let response;
      if (this.tipo === "Crear") {
        if (!this.formVacante.value.idEmpresa) {
          this.error = "no se encuentra el idEmpresa";
          return;
        }
        response = await this.vacanteService.insert(this.formVacante.value);
        this.mostrarMensaje(response, "Vacante creada con éxito");
      } else {
        response = await this.vacanteService.update(this.formVacante.value);
        this.mostrarMensaje(response, "Vacante actualizada con éxito");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async eliminarVacante() {
    const idVacante = this.formVacante.value.idVacante;
    if (!idVacante) {
      this.error = "No se puede eliminar la vacante";
      return;
    }

    try {
      const response = await this.vacanteService.delete(idVacante);
      this.mostrarMensaje(response, "Vacante eliminada con éxito");
    } catch (error) {
      this.error = "Error al eliminar la vacante";
      console.error(error);
    }
  }

  mostrarMensaje(response: number, mensajeOk: string) {
    if (response === 1) {
      this.mensaje = mensajeOk;
      this.router.navigate(['/dashboardEmpresa']);
    } else {
      this.error = "Operación no completada";
    }
  }

  checkControl(nombre: string, error: string): boolean {
    const control = this.formVacante.get(nombre);
    return control ? control.hasError(error) && control.touched : false;
  }

  cancelar() {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      this.volver();
    }
  }

  volver(): void {
    this.router.navigate(["/dashboardEmpresa"]);
  }
}