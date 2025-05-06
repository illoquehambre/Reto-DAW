import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISolicitud } from '../interfaces/isolicitud';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudCliService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/api';
  

  constructor() { }

  insert(solicitud: ISolicitud): Promise<number>{
      return lastValueFrom(this.httpClient.post<number>(this.baseUrl+"/solicitud", solicitud, this.getAuthoritation()));
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
