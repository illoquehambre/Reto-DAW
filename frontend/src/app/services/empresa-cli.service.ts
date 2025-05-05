import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IEmpresa } from '../interfaces/iempresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaCliService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/admin';
  private baseUrlCli: string = 'http://localhost:8083/api';

  constructor() { }

  getAll(): Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(this.baseUrl);
  }

  getAllCliente(): Promise<IEmpresa[]> {
    return lastValueFrom(this.httpClient.get<IEmpresa[]>(this.baseUrlCli+"/empresas", this.getAuthoritation()));
  }

  findById(id: number): Observable<IEmpresa> {
    return this.httpClient.get<IEmpresa>(`${this.baseUrl}/${id}`);
  }

  findByIdCliente(id: number): Promise<IEmpresa> {
    return lastValueFrom(this.httpClient.get<IEmpresa>(`${this.baseUrlCli}/empresa/${id}`, this.getAuthoritation()));
  }

  findByEmail(email: string): Promise<IEmpresa>{
    return lastValueFrom(this.httpClient.get<IEmpresa>(this.baseUrl+"/empresaEmail/"+email, this.getAuthoritation()));
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