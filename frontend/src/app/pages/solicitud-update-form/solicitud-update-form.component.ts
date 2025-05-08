import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISolicitud } from '../../interfaces/isolicitud';
import { FormBuilder, FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { ISolicitudUpdateDto } from '../../interfaces/i-solicitud-update-dto';

@Component({
  selector: 'app-solicitud-update-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './solicitud-update-form.component.html',
  styleUrl: './solicitud-update-form.component.css'
})
export class SolicitudUpdateFormComponent implements OnInit {
  @Input() solicitud!: ISolicitudUpdateDto;
  @Output() guardar = new EventEmitter<ISolicitudUpdateDto | null>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      archivo: [this.solicitud.archivo],
      cv: [this.solicitud.curriculum],
      comentarios: [this.solicitud.comentarios]
    });
  }
  
  onSubmit() {
    const formData = this.form.value;
  
    const solicitudActualizada: ISolicitudUpdateDto = {
      idSolicitud: this.solicitud.idSolicitud,
      archivo: formData.archivo,
      curriculum: formData.cv,
      comentarios: formData.comentarios,
      idVacante: this.solicitud.idVacante
    };
  
    this.guardar.emit(solicitudActualizada);
  }

}
