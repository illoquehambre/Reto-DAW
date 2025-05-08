import { Component, inject } from '@angular/core';
import { EmpresaAdminCardComponent } from "../../components/empresa-admin-card/empresa-admin-card.component";
import { Router } from '@angular/router';
import { IEmpresa } from '../../interfaces/iempresa';
import { EmpresaCliService } from '../../services/empresa-cli.service';

@Component({
  selector: 'app-empresa-admin-list',
  standalone: true,
  imports: [EmpresaAdminCardComponent],
  templateUrl: './empresa-admin-list.component.html',
  styleUrl: './empresa-admin-list.component.css'
})
export class EmpresaAdminListComponent {

  router = inject(Router);
  arrEmpresa: IEmpresa[];
  empresaService = inject(EmpresaCliService);
  
  constructor(){
    this.arrEmpresa = [];
  }
  
  async ngOnInit(): Promise<void>{
    try{
      this.empresaService.getAll().subscribe((data: IEmpresa[]) => {
        this.arrEmpresa = data;
      });
    }catch(err){
      alert('Error al conectar a la API: ' + err);
    }
  }
  
  nuevaEmpresa(){
    this.router.navigate(['/empresaAdminNew']);
  }
  
  volver(){
    this.router.navigate(['/dashboardAdmin']);
  }
}
