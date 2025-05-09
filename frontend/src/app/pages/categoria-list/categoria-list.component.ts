import { Component, inject } from '@angular/core';
import { ICategoria } from '../../interfaces/icategoria';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaCardComponent } from "../../components/categoria-card/categoria-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CategoriaCardComponent],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

  router = inject(Router);
  arrCategoria: ICategoria[];
  categoriaService = inject(CategoriaService);

  constructor(){
    this.arrCategoria = [];
  }

  async ngOnInit(): Promise<void>{
    try{
      this.arrCategoria = await this.categoriaService.getAll();
    }catch(err){
      alert('Error al conectar a la API: ' + err);
    }
  }

  nuevaCategoria(){
    this.router.navigate(['/categoriaNew']);
  }

  volver(){
    this.router.navigate(['/dashboardAdmin']);
  }
}
