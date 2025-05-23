import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategoria } from '../../interfaces/icategoria';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {

  router = inject(Router);
  categoriaService = inject(CategoriaService);
  activatedRoute = inject(ActivatedRoute);

  categoriaForm: FormGroup;
  tipo: string;

  constructor(){
    this.tipo = "Nuevo";

    this.categoriaForm = new FormGroup({
      idCategoria: new FormControl('', []),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(5)])
    },[]);
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params.id_categoria){
        this.tipo = "Actualizar"

        const categoriaResponse : ICategoria = await this.categoriaService.findById(params.id_categoria);

        this.categoriaForm = new FormGroup({
          idCategoria: new FormControl(categoriaResponse.idCategoria,[]),
          nombre: new FormControl(categoriaResponse.nombre, [Validators.required, Validators.minLength(3)]),
          descripcion: new FormControl(categoriaResponse.descripcion, [Validators.required, Validators.minLength(5)])
        }, []);
      }
    });
  }

  async getDataForm(){
    let categoria: ICategoria = this.categoriaForm.value as ICategoria;
    let comprobar: number;

    if(this.tipo == "Nuevo"){
      comprobar = await this.categoriaService.insert(categoria);

      if (comprobar == 1){
        alert('Se ha creado correctamente la nueva categoría');
        this.router.navigate(['/categoriasList']);
      }else {
        alert('Error en la API');
      }

    }else{
      comprobar = await this.categoriaService.update(categoria);

      if (comprobar == 1){
        alert('Se ha actualizado correctamente la categoría');
        this.router.navigate(['/categoriasList']);
      }else {
        alert('Error en la API');
      }
    }
  }
}
