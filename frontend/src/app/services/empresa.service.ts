import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IEmpresa } from '../interfaces/iempresa';
import { IVacante } from '../interfaces/ivacante';
import { ISolicitud } from '../interfaces/isolicitud';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:8083/admin';
  private apiUrlEmpresa = 'http://localhost:8083/empresa/vacantesEmpresa'


  private baseUrl: string = 'http://localhost:8083/admin';
  private apiUrlEmpresa = 'http://localhost:8083/empresa/vacantesEmpresa'


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


    getVacantesByEmpresa(idEmpresa: number): Observable<IVacante[]> {
      const token = localStorage.getItem('accessToken') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<IVacante[]>(
        `${this.apiUrlEmpresa}/vacantesEmpresa/${idEmpresa}`,
        { headers }
      );
    }

    getVacantesByUsuario(): Observable<IVacante[]> {
      const token = localStorage.getItem('accessToken') || '';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<IVacante[]>(
        `${this.apiUrlEmpresa}/vacantesEmpresa`,
        { headers }
      );
    }

  getAuthoritation() {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ""  
    });
    return { headers };
  }


async findEmpresaUsuario(): Promise<IEmpresa> {
  return await lastValueFrom(this.httpClient.get<IEmpresa>(`${this.baseUrl}/me`, this.getAuthoritation()
    ));
  }



    getSolicitudesByUsuario(): Observable<ISolicitud[]>{
      const token = localStorage.getItem('accessToken') || '';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<ISolicitud[]>(
        `${this.apiUrlEmpresa}/solicitudesUsuario`,
        { headers }
      )
    }
} 