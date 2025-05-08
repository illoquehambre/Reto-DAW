import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';
import { ISolicitudUpdateDto } from '../../interfaces/i-solicitud-update-dto';
import { VacanteService } from '../../services/vacante.service';
import { IVacante } from '../../interfaces/ivacante';

@Component({
  selector: 'app-solicitud-card-cli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card-cli.component.html',
  styleUrl: './solicitud-card-cli.component.css'
})
export class SolicitudCardCliComponent {
  vacanteService = inject(VacanteService);
  Vacante: IVacante;
  nombreVacante: string;
  @Input() solicitud!: ISolicitud;
  @Output() edit = new EventEmitter<ISolicitud>();
  @Output() delete = new EventEmitter<number>();

  constructor() {
    this.Vacante = {} as IVacante;
    this.nombreVacante = "";
  }

  async ngOnInit(){
    this.Vacante = await this.vacanteService.getByIdCli(this.solicitud.idVacante);
    this.nombreVacante = this.Vacante.nombre;
    console.log(this.Vacante);
    console.log( this.nombreVacante);
  }

  onEdit() {
    this.edit.emit(this.solicitud); 
  }

  onDelete() {
    if (confirm('¿Eliminar esta solicitud?')) {
      this.delete.emit(this.solicitud.idSolicitud);
    }
  }
}
