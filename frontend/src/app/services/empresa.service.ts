import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpresa } from '../interfaces/iempresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/admin';

  constructor() { }

  getAll(): Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(this.baseUrl);
  }

  findById(id: number): Observable<IEmpresa> {
    return this.httpClient.get<IEmpresa>(`${this.baseUrl}/${id}`);
  }

  insert(empresa: IEmpresa): Observable<IEmpresa> {
    return this.httpClient.post<IEmpresa>(this.baseUrl, empresa);
  }

  update(id: number, empresa: IEmpresa): Observable<IEmpresa> {
    return this.httpClient.put<IEmpresa>(`${this.baseUrl}/${id}`, empresa);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
} 