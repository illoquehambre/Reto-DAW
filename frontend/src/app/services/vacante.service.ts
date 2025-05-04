import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IVacante } from '../interfaces/ivacante';

@Injectable({ providedIn: 'root' })
export class VacanteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8083/api'; // Ajusta la URL si es necesario

  getAllVacantes(): Promise<IVacante[]> {
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacante[]>(this.apiUrl+'/vacantes', { headers }));
  }

  getById(id_vacante: number): Promise<IVacante>{
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacante>(this.apiUrl+"/vacante/"+id_vacante, { headers }));
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

  /*
  findById(id_categoria: number): Promise<ICategoria>{
      return lastValueFrom(this.httpClient.get<ICategoria>(this.baseUrl+"/categoria/"+id_categoria, this.getAuthoritation()));
    }
  */
}