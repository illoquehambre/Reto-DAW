import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/icategoria';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/admin';

  constructor() { }

  getAll(): Promise<ICategoria[]>{
      return lastValueFrom(this.httpClient.get<ICategoria[]>(this.baseUrl+"/categorias"));
    }

  findById(id_categoria: number): Promise<ICategoria>{
    return lastValueFrom(this.httpClient.get<ICategoria>(this.baseUrl+"/categoria/"+id_categoria));
  }

  insert(categoria: ICategoria): Promise<number>{
    return lastValueFrom(this.httpClient.post<number>(this.baseUrl+"/categoria", categoria));
  }

  update(categoria: ICategoria): Promise<number>{
    return lastValueFrom(this.httpClient.put<number>(this.baseUrl+"/categoria", categoria)); 
  }

  delete(id_categoria: number): Promise<number> {
    return lastValueFrom(this.httpClient.delete<number>(this.baseUrl+"/categoria/"+id_categoria));
  }
}
