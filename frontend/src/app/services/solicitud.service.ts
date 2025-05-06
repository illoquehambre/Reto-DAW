import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ISolicitud } from '../interfaces/isolicitud';

@Injectable({ providedIn: 'root' })
export class SolicitudService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8083/empresa';


  getAllSolicitudes(): Promise<ISolicitud[]> {
    return lastValueFrom(this.http.get<ISolicitud[]>(`${this.apiUrl}`, this.getAuthorization()));
  }

  getById(idSolicitud: number): Promise<ISolicitud> {
    return lastValueFrom(this.http.get<ISolicitud>(`${this.apiUrl}/${idSolicitud}`, this.getAuthorization()));
  }

  getSolicitudesByVacante(idVacante: number): Promise<ISolicitud[]> {
    return lastValueFrom(this.http.get<ISolicitud[]>(`${this.apiUrl}/solicitudes/${idVacante}`, this.getAuthorization()));
  }

  async putSolicitud(solicitud: ISolicitud): Promise<number> {
    return lastValueFrom(this.http.put<number>(`${this.apiUrl}/editarSolicitud`, solicitud, this.getAuthorization()));
  }

  async deleteSolicitud(idSolicitud: number): Promise<number> {
    return lastValueFrom(this.http.delete<number>(`${this.apiUrl}/eliminarSolicitud/${idSolicitud}`, this.getAuthorization()));
  }

  private getAuthorization() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` || ""
      })
    };
  }
}
