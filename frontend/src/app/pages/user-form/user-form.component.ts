import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../interfaces/icategoria';
import { CategoriaService } from '../../services/categoria.service';
import { IUserForm } from '../../interfaces/iuser-form';
import { IUser } from '../../interfaces/iuser';
import { IEmpresa } from '../../interfaces/iempresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  router = inject(Router);
  userService = inject(UserService);
  empresaService = inject(EmpresaService);
  activatedRoute = inject(ActivatedRoute);
  
  userForm: FormGroup;
  tipo: string;
  rolControl: string;
  
  constructor(){
    this.tipo = "Nuevo";
    this.rolControl = "";
  
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rol: new FormControl('', [Validators.required]),
      cifEmpresa: new FormControl('', []),
      nombreEmpresa: new FormControl('', []),
      direccionEmpresa: new FormControl('', []),
      paisEmpresa: new FormControl('', [])
    },[]);

    this.userForm.get('rol')?.valueChanges.subscribe(value => {
      if (value === 'company') {
        this.userForm.get('cifEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('nombreEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('direccionEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('paisEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('cifEmpresa')?.updateValueAndValidity();
        this.userForm.get('nombreEmpresa')?.updateValueAndValidity();
        this.userForm.get('direccionEmpresa')?.updateValueAndValidity();
        this.userForm.get('paisEmpresa')?.updateValueAndValidity();
      } else {
        this.userForm.get('cifEmpresa')?.clearValidators();
        this.userForm.get('nombreEmpresa')?.clearValidators();
        this.userForm.get('direccionEmpresa')?.clearValidators();
        this.userForm.get('paisEmpresa')?.clearValidators();
        this.userForm.get('cifEmpresa')?.updateValueAndValidity();
        this.userForm.get('nombreEmpresa')?.updateValueAndValidity();
        this.userForm.get('direccionEmpresa')?.updateValueAndValidity();
        this.userForm.get('paisEmpresa')?.updateValueAndValidity();
      }
    });

    /*this.categoriaForm = new FormGroup({
      idCategoria: new FormControl('', []),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(5)])
    },[]);*/
  }
  
  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params.id_categoria){
        this.tipo = "Actualizar"
  
        /*const categoriaResponse : ICategoria = await this.empresaService.findById(params.id_categoria);
  
        this.userForm = new FormGroup({
          idCategoria: new FormControl(categoriaResponse.idCategoria,[]),
          nombre: new FormControl(categoriaResponse.nombre, [Validators.required, Validators.minLength(3)]),
          descripcion: new FormControl(categoriaResponse.descripcion, [Validators.required, Validators.minLength(5)])
        }, []);*/
      }
    });

    /*this.userForm.get('rol')?.valueChanges.subscribe(response => {
      if(response ==)
    });*/
  }

  
  async getDataForm(){
    let userFormRegister: IUserForm = this.userForm.value as IUserForm;
    let user: IUser = {} as IUser;
    let empresa: IEmpresa = {} as IEmpresa;
    let comprobar: number;
  
    if(this.tipo == "Nuevo"){
      user.email = userFormRegister.email;
      user.nombre = userFormRegister.nombre;
      user.apellidos = userFormRegister.apellidos;

      //comprobar = await this.categoriaService.insert(categoria);
      try{
        if (userFormRegister.rol == 'admin'){
          comprobar = await this.userService.insertAdmin(user);

          if (comprobar == 1){
            alert('Se ha creado correctamente el nuevo usuario');
            this.router.navigate(['/usersList']);
          }else {
            alert('Error en la API');
          }

        }else if (userFormRegister.rol == 'user'){
          comprobar = await this.userService.insertCliente(user);

          if (comprobar == 1){
            alert('Se ha creado correctamente el nuevo usuario');
            this.router.navigate(['/usersList']);
          }else {
            alert('Error en la API');
          }

        }else{
          comprobar = await this.userService.insertEmpresa(user);

          /*if (comprobar == 1){
            alert('Se ha creado correctamente el nuevo usuario');
            //this.router.navigate(['/usersList']);
          }else {
            alert('Error en la API');
          }*/

          empresa.cif = userFormRegister.cifEmpresa;
          empresa.nombreEmpresa = userFormRegister.nombreEmpresa;
          empresa.direccionFiscal = userFormRegister.direccionEmpresa;
          empresa.pais = userFormRegister.paisEmpresa;
          empresa.email = userFormRegister.email;

          this.empresaService.insert(empresa).subscribe((data: number) => {
            comprobar = data;

            if (comprobar == 1){
              alert('Se ha creado correctamente el nuevo usuario y empresa');
              this.router.navigate(['/usersList']);
            }else {
              alert('Error en la API');
            }
          });
        }
      }catch(err: any){
        alert('Error en la API: ' + err.message);
      }
      
    }/*else{
      try {
        this.userService.insert(user).subscribe((data: number) => {
          comprobar = data;

          if (comprobar == 1){
            alert('Se ha actualizado correctamente la categoría');
            this.router.navigate(['/usersList']);
          }else {
            alert('Error en la API');
          }
        });
        
      }catch(err: any){
        alert('Error en la API: ' + err.message);
      }
    }*/
  }
}
