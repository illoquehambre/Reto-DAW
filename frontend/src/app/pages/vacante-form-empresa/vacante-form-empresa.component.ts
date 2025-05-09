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
    // Obtener idEmpresa
    const email = localStorage.getItem('email');
    if (email) {
      try {
        const empresa = await this.empresaService.findByEmail(email);
        if (empresa?.idEmpresa) {
          this.formVacante.patchValue({ idEmpresa: empresa.idEmpresa });
        } else {
          this.error = "No se encontró empresa asociada al usuario";
        }
      } catch (error) {
        console.error('Error al obtener empresa:', error);
        this.error = "Error al cargar datos de la empresa";
      }
    } else {
      this.error = "No se encontró el email del usuario";
      this.router.navigate(['/login']);
    }

    this.ruta.params.subscribe(async (params: any) => {
      if (params.idVacante) {
        this.tipo = "Editar";
        try {
          const vacanteResponse = await this.vacanteService.getById(params.idVacante);
          if (vacanteResponse) {
            this.formVacante.patchValue(vacanteResponse);
          }
        } catch (error) {
          console.error('Error al cargar vacante:', error);
          this.error = "Error al cargar los datos de la vacante";
        }
      } else {
        this.tipo = "Crear";
        // Resetear el formulario para modo creación
        this.formVacante.reset({
          estatus: Estatus.CREADA,
          destacado: false,
          idEmpresa: this.formVacante.value.idEmpresa
        });
      }
    });
  }

  async getDataForm() {
    if (this.formVacante.invalid) {
      this.error = "Faltan campos por completar.";
      return;
    }

    try {
      if (this.tipo === "Crear") {
        if (!this.formVacante.value.idEmpresa) {
          this.error = "No se encuentra el idEmpresa";
          return;
        }
        
        const response = await this.vacanteService.insert(this.formVacante.value);
        if (response === 1) {
          this.mostrarMensaje(response, "Vacante creada con éxito");
          // Limpiar el formulario para nueva creación
          this.formVacante.reset({
            estatus: Estatus.CREADA,
            destacado: false,
            idEmpresa: this.formVacante.value.idEmpresa
          });
          this.tipo = "Crear"; // Asegurar que sigue en modo creación
        } else {
          this.error = "Error al crear la vacante";
        }
      } else {
        const response = await this.vacanteService.update(this.formVacante.value);
        this.mostrarMensaje(response, "Vacante actualizada con éxito");
      }
    } catch (error) {
      console.error(error);
      this.error = "Error en el servidor";
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
      // No redirigimos inmediatamente para permitir ver el mensaje
      setTimeout(() => {
        this.router.navigate(['/dashboardEmpresa']);
      }, 1500);
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