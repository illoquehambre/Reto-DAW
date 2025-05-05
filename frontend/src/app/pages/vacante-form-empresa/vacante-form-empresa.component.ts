import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
  tipo: string = "Crear";
  estOptions: Estatus[] = [Estatus.CREADA, Estatus.CUBIERTA, Estatus.CANCELADA];

  constructor() {
    this.formVacante = new FormGroup({
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
    const email = localStorage.getItem('email');
    if (email) {
        const empresa = await this.empresaService.findByEmail(email);
        if (empresa?.idEmpresa) {
            this.formVacante.patchValue({ idEmpresa: empresa.idEmpresa });
        }
    }
  }

  async getDataForm() {
    if (!this.formVacante.value.idCategoria || !this.formVacante.value.idEmpresa) {
        return;
    }

    this.formVacante.patchValue({ idCategoria: Number(this.formVacante.value.idCategoria) });
    await this.vacanteService.insert(this.formVacante.value);
  }

  volver(): void {
    this.router.navigate(["/dashboardEmpresa"]);
  }
}
