import { Component, inject, Input } from '@angular/core';
import { IEmpresa } from '../../interfaces/iempresa';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-card',
  templateUrl: './empresa-card.component.html',
  styleUrls: ['./empresa-card.component.css']
})
export class EmpresaCardComponent {

    router = inject(Router);
    empresaService = inject(EmpresaService);
    @Input() miEmpresa!: IEmpresa;
} 