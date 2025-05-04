import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IEmpresa } from '../interfaces/iempresa';
import { IVacante } from '../interfaces/ivacante';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/admin';
  private apiUrlEmpresa = 'http://localhost:8083/empresa/vacantesEmpresa'

  constructor() { }

  getAll(): Observable<IEmpresa[]> {
    return this.httpClient.get<IEmpresa[]>(this.baseUrl);
  }

  findById(id: number): Observable<IEmpresa> {
    return this.httpClient.get<IEmpresa>(`${this.baseUrl}/${id}`);
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

  
    getVacantesByEmpresa(idEmpresa: number): Observable<IVacante[]> {
      const token = localStorage.getItem('accessToken') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<IVacante[]>(
        `${this.apiUrlEmpresa}/${idEmpresa}`,
        { headers }
      );
    }
} 