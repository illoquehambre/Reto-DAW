import { Component, inject } from '@angular/core';
import { ICategoria } from '../../interfaces/icategoria';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaCardComponent } from "../../components/categoria-card/categoria-card.component";

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CategoriaCardComponent],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

  arrCategoria: ICategoria[];
  categoriaService = inject(CategoriaService);

  constructor(){
    this.arrCategoria = [];
  }

  async ngOnInit(): Promise<void>{
    try{
      this.arrCategoria = await this.categoriaService.categoriasAll();
    }catch(err){
      alert('Error al conectar a la API: ' + err);
    }
  }
}
