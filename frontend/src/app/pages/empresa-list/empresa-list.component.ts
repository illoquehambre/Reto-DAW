import { Component, inject, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { IEmpresa } from '../../interfaces/iempresa';
import { Router } from '@angular/router';
import { EmpresaCardComponent } from '../../components/empresa-card/empresa-card.component';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [EmpresaCardComponent],
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

    router = inject(Router);
    arrEmpresas: IEmpresa[];
    empresaService = inject(EmpresaService);
  
    constructor(){
      this.arrEmpresas = [];
    }
  
    ngOnInit() {
        this.empresaService.getAll().subscribe((data: IEmpresa[]) => {
          this.arrEmpresas = data;
        });
      }
  
    nuevaEmpresa(){
      this.router.navigate(['/empresaNew']);
    }
  
    volver(){
      this.router.navigate(['/dashboardAdmin']);
    }
  }
  