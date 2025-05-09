import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ISolicitudNew } from '../../interfaces/isolicitud-new';
import { ISolicitud } from '../../interfaces/isolicitud';
import { SolicitudCliService } from '../../services/solicitud-cli.service';

@Component({
  selector: 'app-solicitud-form-cli',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './solicitud-form-cli.component.html',
  styleUrl: './solicitud-form-cli.component.css'
})
export class SolicitudFormCliComponent {

  solicitudForm: FormGroup;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  solicitudService = inject(SolicitudCliService);
  idVacante: number;

  constructor(){
      this.idVacante = 0;
      this.solicitudForm = new FormGroup({
        idSolicitud: new FormControl('', []),
        archivo: new FormControl('', [Validators.required, Validators.minLength(3)]),
        comentarios: new FormControl('', [Validators.required, Validators.minLength(5)]),
        curriculum: new FormControl('', [Validators.required, Validators.minLength(5)])
      },[]);
    }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params.id_vacante){
        this.idVacante = params.id_vacante;
        console.log(params.id_vacante);
      }
    });
  }

  async getDataForm(){
    let solicitudNew: ISolicitudNew = this.solicitudForm.value as ISolicitudNew;
    let solicitud: ISolicitud = {} as ISolicitud;
    let comprobar: number;
    let comprobarSolicitud: ISolicitud = {} as ISolicitud;

    solicitud.archivo = solicitudNew.archivo;
    solicitud.comentarios = solicitudNew.comentarios;
    solicitud.curriculum = solicitudNew.curriculum;
    solicitud.idVacante = this.idVacante;

    try{
      comprobar = await this.solicitudService.insert(solicitud);

      if (comprobar == 1){
        alert('Se ha creado correctamente la nueva solicitud');
        this.router.navigate(['/vacantesListCli']);
        //location.reload();
      }else if (comprobar == 2){
        alert('Ya tienes una solicitud creada en esta vacante. Elimina la que ya tienes primero para crear otra.');
        this.router.navigate(['/vacantesListCli']);
      }
      else {
        alert('Error en la API');
      }
    }catch(err: any){
      alert('Error en la API: ' + err.message);
    }
  }
}
