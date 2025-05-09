import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaCliService } from '../../services/empresa-cli.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmpresa } from '../../interfaces/iempresa';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { IEmpresaForm } from '../../interfaces/iempresa-form';

@Component({
  selector: 'app-empresa-admin-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './empresa-admin-form.component.html',
  styleUrl: './empresa-admin-form.component.css'
})
export class EmpresaAdminFormComponent {

  router = inject(Router);
  empresaService = inject(EmpresaCliService);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  
  empresaForm: FormGroup;
  tipo: string;
  
  constructor(){
    this.tipo = "Nuevo";
  
    this.empresaForm = new FormGroup({
        IdEmpresa: new FormControl('', []),
        cifEmpresa: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
        nombreEmpresa: new FormControl('', [Validators.required, Validators.minLength(5)]),
        direccionEmpresa: new FormControl('', [Validators.required]),
        paisEmpresa: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        apellidos: new FormControl('', [Validators.required])
      },[]);
    }
  
  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params.id_empresa){
        this.tipo = "Actualizar"
        
        //const categoriaResponse : IEmpresa = await this.empresaService.findById(params.id_empresa);
        let empresaResponse : IEmpresa = {} as IEmpresa;
        let usuarioResponse : IUser = {} as IUser;
        /*this.empresaService.findById(params.id_empresa).subscribe((data: IEmpresa) => {
          empresaResponse = data;
        });*/
        empresaResponse = await this.empresaService.findById(params.id_empresa);
        usuarioResponse = await this.userService.getByEmail(empresaResponse.email);
  
        this.empresaForm = new FormGroup({
          IdEmpresa: new FormControl(empresaResponse.idEmpresa, []),
          cifEmpresa: new FormControl(empresaResponse.cif, [Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
          nombreEmpresa: new FormControl(empresaResponse.nombreEmpresa, [Validators.required, Validators.minLength(5)]),
          direccionEmpresa: new FormControl(empresaResponse.direccionFiscal, [Validators.required]),
          paisEmpresa: new FormControl(empresaResponse.pais, [Validators.required]),
          email: new FormControl({ value: empresaResponse.email, disabled: true }, [Validators.required]),
          nombre: new FormControl({ value: usuarioResponse.nombre, disabled: true }, [Validators.required]),
          apellidos: new FormControl({ value: usuarioResponse.apellidos, disabled: true }, [Validators.required])
        }, []);
      }
    });
  }
  
  async getDataForm(){
    /*let empresa: IEmpresa = this.empresaForm.value as IEmpresa;
    let comprobar: number;
    */
    let empresaFormRegister: IEmpresaForm = this.empresaForm.getRawValue() as IEmpresaForm;
    let user: IUser = {} as IUser;
    let empresa: IEmpresa = {} as IEmpresa;
    let empresaComprobar: IEmpresa = {} as IEmpresa;
    let comprobar: number;

    empresa.cif = empresaFormRegister.cifEmpresa;
    empresa.direccionFiscal = empresaFormRegister.direccionEmpresa;
    empresa.email = empresaFormRegister.email;
    empresa.nombreEmpresa = empresaFormRegister.nombreEmpresa;
    empresa.pais = empresaFormRegister.paisEmpresa;

    user.nombre = empresaFormRegister.nombre;
    user.apellidos = empresaFormRegister.apellidos;
    user.email = empresaFormRegister.email;
  
    if(this.tipo == "Nuevo"){
      //comprobar = await this.empresaService.insert(empresa);

      comprobar = await this.userService.insertEmpresa(user);
      if (comprobar == 1){
        alert('Se ha creado correctamente el nuevo usuario');
        this.router.navigate(['/empresasAdminList']);
      }else {
        alert('Error en la API');
      }

      this.empresaService.insert(empresa).subscribe((data: number) => {
        if (data == 1){
          alert('Se ha creado correctamente la nueva empresa');
          this.router.navigate(['/empresasAdminList']).then(() => {
            window.location.reload();
          });
        }else {
          alert('Error en la API');
        }
      });  
    }else{
      //comprobar = await this.categoriaService.update(categoria);
      empresa.idEmpresa = empresaFormRegister.IdEmpresa;

      this.empresaService.update(empresa).subscribe((data: number) => {
        if (data == 1){
          alert('Se ha actualizado correctamente la empresa');
          this.router.navigate(['/empresasAdminList']).then(() => {
            window.location.reload();
          });
        }else {
          alert('Error en la API');
        }
      });
  
    }
  }
}
