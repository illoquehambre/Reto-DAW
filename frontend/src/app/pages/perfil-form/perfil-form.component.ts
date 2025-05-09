import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { IEmpresa } from '../../interfaces/iempresa';

@Component({
  selector: 'app-perfil-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent {

  private fb = inject(FormBuilder);
  private empresaService = inject(EmpresaService);
  private router = inject(Router);

  error = '';

  form = this.fb.group({
    idEmpresa: [0],
    nombreEmpresa: [''],
    cif: [''],
    direccionFiscal: [''],
    pais: [''],
    email: ['']
  });

 

  async ngOnInit(): Promise<void> {
    try {
      const empresa = await this.empresaService.findEmpresaUsuario();
      this.form.patchValue(empresa);
    } catch {
      this.error = 'Error al cargar los datos';
    }
  }

  async guardar(): Promise<void> {
    if (this.form.invalid) {
      this.error = "Complete todos los campos requeridos";
      return;
    }

    try {
      const empresaData = this.form.value as IEmpresa;
      await lastValueFrom(this.empresaService.update(empresaData));
      this.router.navigate(['/dashboardEmpresa/perfilEmpresa']);
    } catch {
      this.error = 'Error al guardar los cambios';
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboardEmpresa/perfilEmpresa']);
  }
}