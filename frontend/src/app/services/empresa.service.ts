import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IEmpresa } from '../interfaces/iempresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/empresa';

  constructor() { }

  getAll(): Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(this.baseUrl);
  }

  getAllCliente(): Promise<IEmpresa[]> {
    return lastValueFrom(this.httpClient.get<IEmpresa[]>(this.baseUrl+"/empresas", this.getAuthoritation()));
  }

  findById(id: number): Observable<IEmpresa> {
    return this.httpClient.get<IEmpresa>(`${this.baseUrl}/${id}`);
  }

  findByIdCliente(id: number): Promise<IEmpresa> {
    return lastValueFrom(this.httpClient.get<IEmpresa>(`${this.baseUrl}/${id}`, this.getAuthoritation()));
  }

  async findByEmail(email: string): Promise<IEmpresa> {
    return await lastValueFrom(this.httpClient.get<IEmpresa>(this.baseUrl+"/me", this.getAuthoritation())
    );
  }


  insert(empresa: IEmpresa): Observable<number> {
    return this.httpClient.post<number>(this.baseUrl+"/empresa", empresa, this.getAuthoritation());
  }

  update(empresa: IEmpresa): Observable<number> {
    return this.httpClient.put<number>(this.baseUrl+"/empresa", empresa, this.getAuthoritation());
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAuthoritation() {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ""  
    });
    return { headers };
  }

  getPerfilEmpresa(idEmpresa: number): Promise<IEmpresa> {
    return lastValueFrom(this.httpClient.get<IEmpresa>(`${this.baseUrl}/${idEmpresa}`, this.getAuthoritation()));
  }


async findEmpresaUsuario(): Promise<IEmpresa> {
  return await lastValueFrom(this.httpClient.get<IEmpresa>(`${this.baseUrl}/me`, this.getAuthoritation()
    ));
  }

  
} 