import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/icategoria';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/admin';
  private baseUrlCli: string = 'http://localhost:8083/api';

  constructor() { }

  getAll(): Promise<ICategoria[]>{
    console.log(localStorage.getItem("accessToken"));
      return lastValueFrom(this.httpClient.get<ICategoria[]>(this.baseUrl+"/categorias", this.getAuthoritation()));
  }

  getAllCliente(): Promise<ICategoria[]>{
    console.log(localStorage.getItem("accessToken"));
      return lastValueFrom(this.httpClient.get<ICategoria[]>(this.baseUrlCli+"/categorias", this.getAuthoritation()));
  }

  findById(id_categoria: number): Promise<ICategoria>{
    return lastValueFrom(this.httpClient.get<ICategoria>(this.baseUrl+"/categoria/"+id_categoria, this.getAuthoritation()));
  }

  findByIdCliente(id_categoria: number): Promise<ICategoria>{
    return lastValueFrom(this.httpClient.get<ICategoria>(this.baseUrlCli+"/categoria/"+id_categoria, this.getAuthoritation()));
  }

  insert(categoria: ICategoria): Promise<number>{
    return lastValueFrom(this.httpClient.post<number>(this.baseUrl+"/categoria", categoria, this.getAuthoritation()));
  }

  update(categoria: ICategoria): Promise<number>{
    return lastValueFrom(this.httpClient.put<number>(this.baseUrl+"/categoria", categoria, this.getAuthoritation())); 
  }

  delete(id_categoria: number): Promise<number> {
    return lastValueFrom(this.httpClient.delete<number>(this.baseUrl+"/categoria/"+id_categoria, this.getAuthoritation()));
  }

  getAuthoritation(){
    const httOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` || "" //Esto que si no hay Token que lo pase vacío
      })
    };
    return httOptions;
  }
}
