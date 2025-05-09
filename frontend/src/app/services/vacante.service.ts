import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IVacante } from '../interfaces/ivacante';
import { IVacanteResponse } from '../interfaces/ivacante-response';

@Injectable({ providedIn: 'root' })
export class VacanteService {
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8083/empresa'; // Ajusta la URL si es necesario
  private apiUrlVacante = 'http://localhost:8083/api'; 

  //Vacantes Empresa
  getAllVacantes(): Promise<IVacante[]> {
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacante[]>(this.apiUrl+'/vacantes', { headers }));
  }

  getVacantesByEmpresa(idEmpresa: number): Promise<IVacanteResponse[]> {
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    return lastValueFrom(this.http.get<IVacanteResponse[]>(`${this.apiUrl}/vacantesEmpresa/${idEmpresa}`, { headers }));
  }

  getById(id_vacante: number): Promise<IVacanteResponse>{
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacanteResponse>(this.apiUrl+"/vacante/"+id_vacante, { headers }));
  }

  async insert(vacante: IVacante): Promise<number> {
<<<<<<< HEAD
    return lastValueFrom(this.http.post<number>(`${this.apiUrl}/nuevaVacante`, vacante, this.getAuthoritation()));
  }

  findById(id: number): Promise<IVacante> {
    return lastValueFrom(this.http.get<IVacante>(`${this.apiUrl}/vacante/${id}`, this.getAuthoritation()));
  }  
  
   
=======
    return await lastValueFrom(this.http.post<number>(this.apiUrl+"/nuevaVacante",vacante,this.getAuthoritation()));
  }

  async update(vacante: IVacante): Promise<number> {
    return await lastValueFrom(this.http.put<number>(`${this.apiUrl}/editarVacante`, vacante, this.getAuthoritation()));
  }

  async delete(idVacante: number): Promise<number> {
    return await lastValueFrom(this.http.delete<number>(`${this.apiUrl}/cancelarVacante/${idVacante}`, this.getAuthoritation()));
  }

  findById(id: number): Promise<IVacante> {
    return lastValueFrom(this.http.get<IVacante>(`${this.apiUrl}/vacante/${id}`, this.getAuthoritation()));
  } 
  
>>>>>>> versionArreglada

  async getByCategoria(idCategoria: number): Promise<IVacante[]> {
    return await lastValueFrom(this.http.get<IVacante[]>(`${this.apiUrl}/vacantes/categoria/${idCategoria}`));
  }


  async getByEmpresa(idEmpresa: number): Promise<IVacante[]> {
    return await lastValueFrom(this.http.get<IVacante[]>(`${this.apiUrl}/vacantes/empresa/${idEmpresa}`));
  }

  async filtrarVacantes(filtrar: any): Promise<IVacante[]>{
    let arrVacantes: IVacante[] = await this.getAllVacantes();
    
    //Empresa
    if (filtrar.empresa !== '' && filtrar.empresa !== null) {
      arrVacantes = arrVacantes.filter(vacante => vacante.idEmpresa == Number(filtrar.empresa));
    }

    //Categoria
    if (filtrar.categoria !== '' && filtrar.categoria !== null) {
      arrVacantes = arrVacantes.filter(vacante => vacante.idCategoria == Number(filtrar.categoria));
    }

    //Destacado
    if (filtrar.destacado !== '' && filtrar.destacado !== null) {
      arrVacantes = arrVacantes.filter(vacante => vacante.destacado == filtrar.destacado);
    }

    return arrVacantes;
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

  //Vacantes Cliente
  getAllVacantesCli(): Promise<IVacante[]> {
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacante[]>(this.apiUrlVacante+'/vacantes', { headers }));
  }

  getByIdCli(id_vacante: number): Promise<IVacante>{
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacante>(this.apiUrlVacante+"/vacante/"+id_vacante, { headers }));
  }

  async filtrarVacantesCli(filtrar: any): Promise<IVacante[]>{
    let arrVacantes: IVacante[] = await this.getAllVacantesCli();
    
    //Empresa
    if (filtrar.empresa !== '' && filtrar.empresa !== null) {
      arrVacantes = arrVacantes.filter(vacante => vacante.idEmpresa == Number(filtrar.empresa));
    }

    //Categoria
    if (filtrar.categoria !== '' && filtrar.categoria !== null) {
      arrVacantes = arrVacantes.filter(vacante => vacante.idCategoria == Number(filtrar.categoria));
    }

    //Destacado
    if (filtrar.destacado !== '' && filtrar.destacado !== null) {
      arrVacantes = arrVacantes.filter(vacante => vacante.destacado == filtrar.destacado);
    }

    return arrVacantes;
  }

}