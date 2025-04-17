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

  categoriasAll(): Promise<any>{
      return lastValueFrom(this.httpClient.get<any>(this.baseUrl+"/categorias"));
    }
}
