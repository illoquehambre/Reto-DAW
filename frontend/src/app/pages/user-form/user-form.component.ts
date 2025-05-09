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
import { EmpresaCliService } from '../../services/empresa-cli.service';

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
  empresaService = inject(EmpresaCliService);
  activatedRoute = inject(ActivatedRoute);
  
  userForm: FormGroup;
  tipo: string;
  rolControl: string;
  empresaRol: IEmpresa;
  
  constructor(){
    this.tipo = "Nuevo";
    this.rolControl = "";
    this.empresaRol = {} as IEmpresa;
  
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      nombre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      rol: new FormControl(null, [Validators.required]),
      idEmpresa: new FormControl(null, []),
      cifEmpresa: new FormControl(null, []),
      nombreEmpresa: new FormControl(null, []),
      direccionEmpresa: new FormControl(null, []),
      paisEmpresa: new FormControl(null, [])
    },[]);

    /*this.userForm.get('nombre')?.valueChanges.subscribe(value => {console.log(value);})
    this.userForm.get('rol')?.valueChanges.subscribe(value => {
      
      if (value === 'EMPRESA') {
        this.userForm.get('cifEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('nombreEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('direccionEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('paisEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('cifEmpresa')?.updateValueAndValidity();
        this.userForm.get('nombreEmpresa')?.updateValueAndValidity();
        this.userForm.get('direccionEmpresa')?.updateValueAndValidity();
        this.userForm.get('paisEmpresa')?.updateValueAndValidity();
        //this.cargarDatosEmpresa();
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
    });*/
    
    /*this.categoriaForm = new FormGroup({
      idCategoria: new FormControl('', []),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(5)])
    },[]);*/
  }
  
  ngOnInit(): void{
    
    this.activatedRoute.params.subscribe(async (params: any) => {
      
      if(params.email){
        this.tipo = "Actualizar"

        const userResponse : IUser = await this.userService.getByEmail(params.email);
        this.rolControl = userResponse.rol;

        if(userResponse.rol != "EMPRESA") {

          this.userForm = new FormGroup({
            email: new FormControl({ value: userResponse.email, disabled: true }, [Validators.required]),
            nombre: new FormControl(userResponse.nombre, [Validators.required, Validators.minLength(3)]),
            apellidos: new FormControl(userResponse.apellidos, [Validators.required, Validators.minLength(5)]),
            rol: new FormControl(userResponse.rol, [Validators.required]),
            idEmpresa: new FormControl('', []),
            cifEmpresa: new FormControl('', []),
            nombreEmpresa: new FormControl('', []),
            direccionEmpresa: new FormControl('', []),
            paisEmpresa: new FormControl('', [])
          },[]);
          this.userForm.get('nombre')?.valueChanges.subscribe(value => {console.log(value);})
        } else {

          const empresaResponse : IEmpresa = await this.empresaService.findByEmail(userResponse.email);

          this.userForm = new FormGroup({
            email: new FormControl({ value: userResponse.email, disabled: true }, [Validators.required]),
            nombre: new FormControl(userResponse.nombre, [Validators.required, Validators.minLength(3)]),
            apellidos: new FormControl(userResponse.apellidos, [Validators.required, Validators.minLength(5)]),
            rol: new FormControl(userResponse.rol, [Validators.required]),
            idEmpresa: new FormControl(empresaResponse.idEmpresa, []),
            cifEmpresa: new FormControl(empresaResponse.cif, [Validators.required]),
            nombreEmpresa: new FormControl(empresaResponse.nombreEmpresa, [Validators.required]),
            direccionEmpresa: new FormControl(empresaResponse.direccionFiscal, [Validators.required]),
            paisEmpresa: new FormControl(empresaResponse.pais, [Validators.required])
          },[]);
          this.userForm.get('nombre')?.valueChanges.subscribe(value => {console.log(value);})
        }
      }
      this.cambiarRol();
    });
    
  }

  
  async getDataForm(){
    //let userFormRegister: IUserForm = this.userForm.value as IUserForm;
    let userFormRegister: IUserForm = this.userForm.getRawValue() as IUserForm;
    let user: IUser = {} as IUser;
    let empresa: IEmpresa = {} as IEmpresa;
    let empresaComprobar: IEmpresa = {} as IEmpresa;
    let comprobar: number;
  
    if(this.tipo == "Nuevo"){
      user.email = userFormRegister.email;
      user.nombre = userFormRegister.nombre;
      user.apellidos = userFormRegister.apellidos;

      //comprobar = await this.categoriaService.insert(categoria);
      try{
        if (userFormRegister.rol == 'ADMON'){
          comprobar = await this.userService.insertAdmin(user);

          if (comprobar == 1){
            alert('Se ha creado correctamente el nuevo usuario');
            this.router.navigate(['/usersList']);
          }else {
            alert('Error en la API');
          }

        }else if (userFormRegister.rol == 'CLIENTE'){
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
      
    }else{
      try {
        user.email = userFormRegister.email;
        user.nombre = userFormRegister.nombre;
        user.apellidos = userFormRegister.apellidos;
        user.rol = userFormRegister.rol;
console.log(user)
        comprobar = await this.userService.update(user);

        if (userFormRegister.rol == 'EMPRESA') {
          empresa.idEmpresa = userFormRegister.idEmpresa;
          empresa.cif = userFormRegister.cifEmpresa;
          empresa.nombreEmpresa = userFormRegister.nombreEmpresa;
          empresa.direccionFiscal = userFormRegister.direccionEmpresa;
          empresa.pais = userFormRegister.paisEmpresa;

          empresaComprobar = await this.empresaService.findByEmail(userFormRegister.email);
          console.log(empresaComprobar);

          if(empresaComprobar){
            this.empresaService.update(empresa).subscribe((data: number) => {
              comprobar = data;
            });
         }else {
          empresa.idEmpresa = undefined;
          empresa.email = userFormRegister.email;
          this.empresaService.insert(empresa).subscribe((data: number) => {
            comprobar = data;
          });
         }
        }

        if (comprobar == 1){
          alert('Se ha actualizado correctamente el usuario');
          this.router.navigate(['/usersList']);
        }else {
          alert('Error en la API');
        }
        
      }catch(err: any){
        alert('Error en la API: ' + err.message);
      }
    }
  }

  cambiarRol(){
    this.userForm.get('rol')?.valueChanges.subscribe(value => {
      
      if (value === 'EMPRESA') {
        /*this.userForm.get('cifEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('nombreEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('direccionEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('paisEmpresa')?.setValidators([Validators.required]);
        this.userForm.get('cifEmpresa')?.updateValueAndValidity();
        this.userForm.get('nombreEmpresa')?.updateValueAndValidity();
        this.userForm.get('direccionEmpresa')?.updateValueAndValidity();
        this.userForm.get('paisEmpresa')?.updateValueAndValidity();*/
        if (this.tipo == "Actualizar"){
          this.cargarDatosEmpresa();
        } else {
          this.userForm.get('cifEmpresa')?.setValidators([Validators.required]);
          this.userForm.get('nombreEmpresa')?.setValidators([Validators.required]);
          this.userForm.get('direccionEmpresa')?.setValidators([Validators.required]);
          this.userForm.get('paisEmpresa')?.setValidators([Validators.required]);
          this.userForm.get('cifEmpresa')?.updateValueAndValidity();
          this.userForm.get('nombreEmpresa')?.updateValueAndValidity();
          this.userForm.get('direccionEmpresa')?.updateValueAndValidity();
          this.userForm.get('paisEmpresa')?.updateValueAndValidity();
        }
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
  }

  async cargarDatosEmpresa() {
    const email = this.userForm.get('email')?.value;
    this.empresaRol = await this.empresaService.findByEmail(email);
   
    this.userForm.get('cifEmpresa')?.setValidators([Validators.required]);
    this.userForm.get('nombreEmpresa')?.setValidators([Validators.required]);
    this.userForm.get('direccionEmpresa')?.setValidators([Validators.required]);
    this.userForm.get('paisEmpresa')?.setValidators([Validators.required]);

    if (this.empresaRol != null){
      this.userForm.get('cifEmpresa')?.setValue(this.empresaRol.cif);
      this.userForm.get('nombreEmpresa')?.setValue(this.empresaRol.nombreEmpresa);
      this.userForm.get('direccionEmpresa')?.setValue(this.empresaRol.direccionFiscal);
      this.userForm.get('paisEmpresa')?.setValue(this.empresaRol.pais);
    }
    this.userForm.get('cifEmpresa')?.updateValueAndValidity();
    this.userForm.get('nombreEmpresa')?.updateValueAndValidity();
    this.userForm.get('direccionEmpresa')?.updateValueAndValidity();
    this.userForm.get('paisEmpresa')?.updateValueAndValidity();
  }


}
