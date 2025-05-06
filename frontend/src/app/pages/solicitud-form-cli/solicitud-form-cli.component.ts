import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solicitud-form-cli',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './solicitud-form-cli.component.html',
  styleUrl: './solicitud-form-cli.component.css'
})
export class SolicitudFormCliComponent {

  solicitudForm: FormGroup;

  constructor(){
  
      this.solicitudForm = new FormGroup({
        idCategoria: new FormControl('', []),
        nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
        descripcion: new FormControl('', [Validators.required, Validators.minLength(5)])
      },[]);
    }

  async getDataForm(){

  }
}
