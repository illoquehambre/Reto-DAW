import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaCliService } from '../../services/empresa-cli.service';
import { IEmpresa } from '../../interfaces/iempresa';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-empresa-admin-card',
  standalone: true,
  imports: [],
  templateUrl: './empresa-admin-card.component.html',
  styleUrl: './empresa-admin-card.component.css'
})
export class EmpresaAdminCardComponent {

  router = inject(Router);
  empresaService = inject(EmpresaCliService);
  userService = inject(UserService);
  @Input() miEmpresa!: IEmpresa;
  
  editarEmpresa(id_empresa: number | any){
    this.router.navigate(['/empresaAdminUpdate',id_empresa]);
  }
  
  async eliminarEmpresa(id_empresa: any, nombre: string){
    let confirmacion = confirm('¿Deseas eliminar la empresa ' + nombre + ' realmente?');
    if (confirmacion){
    
      let response;
      let empresa: IEmpresa = {} as IEmpresa;
      try{ 
        empresa = await this.empresaService.findById(id_empresa);
        response = await this.userService.delete(empresa.email);

        if (response == 1){
          alert('Se ha eliminado correctamente el usuario');
        }
        else {
          alert('Error en la API');
        }
        //response = await this.empresaService.delete(id_empresa);
        this.empresaService.delete(id_empresa).subscribe((data: number) => {
          response = data;
          if (response == 1){
            alert('Se ha eliminado correctamente la empresa');
            this.router.navigate(['/empresasAdminList']);
            location.reload();
          }
          else {
            alert('Error en la API');
          }
        });
        }catch(err: any){
            alert('Error en la API: ' + err.message);
          
        }
    }
  }
}
