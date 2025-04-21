import { Component, inject, Input } from '@angular/core';
import { ICategoria } from '../../interfaces/icategoria';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-card',
  standalone: true,
  imports: [],
  templateUrl: './categoria-card.component.html',
  styleUrl: './categoria-card.component.css'
})
export class CategoriaCardComponent {

  router = inject(Router);
  categoriaService = inject(CategoriaService);
  @Input() miCategoria!: ICategoria;

  editarCategoria(id_categoria: number | any){
    this.router.navigate(['/categoriaUpdate',id_categoria]);
  }

  async eliminarCategoria(id_categoria: any, nombre: string){
    let confirmacion = confirm('¿Deseas eliminar la categoria ' + nombre + ' realmente?');
    if (confirmacion){
  
      let response;
     try{
        response = await this.categoriaService.delete(id_categoria);

        if (response == 1){
          alert('Se ha eliminado correctamente la categoría');
          this.router.navigate(['/categoriasList']);
          location.reload();
        }else if (response == 2) {
          alert('No se puede eliminar una categoria con vacantes relacionadas');
        }
        else {
          alert('Error en la API');
        }
      }catch(err: any){
        if (err.status === 409) {
          alert('No se puede eliminar una categoría con vacantes relacionadas.');
        } else {
          alert('Error en la API: ' + err.message);
        }
      }
    }
  }
}
