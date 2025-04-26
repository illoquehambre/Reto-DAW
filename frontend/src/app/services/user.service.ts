import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/auth';
  private baseUrlAdmin: string = 'http://localhost:8083/admin';

  constructor() { }

  login(login: ILogin): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl+"/login", login)).then(response => {
      if (response && response.token) {
        localStorage.setItem('accessToken', response.token); // Guarda el token
      }
      return response;
    }).catch(error => {
      console.error('Error en login:', error);
      throw error;
    });
  }

  getAll(): Promise<IUser[]>{
    return lastValueFrom(this.httpClient.get<IUser[]>(this.baseUrlAdmin+"/usuarios", this.getAuthoritation()));
  }

  insertEmpresa(user: IUser): Promise<number>{
    return lastValueFrom(this.httpClient.post<number>(this.baseUrlAdmin+"/usuarioEmpresa", user, this.getAuthoritation()));
  }

  insertAdmin(user: IUser): Promise<number>{
    return lastValueFrom(this.httpClient.post<number>(this.baseUrlAdmin+"/usuarioAdmin", user, this.getAuthoritation()));
  }

  insertCliente(user: IUser): Promise<number>{
    return lastValueFrom(this.httpClient.post<number>(this.baseUrlAdmin+"/usuarioCliente", user, this.getAuthoritation()));
  }

  /*
  login(login: ILogin): Promise<any> {
  return lastValueFrom(this.httpClient.post<any>(this.baseUrl + "/login", login)).then(response => {
    if (response && response.token) {
      localStorage.setItem('accessToken', response.token); // Guarda el token
    }
    return response;
  }).catch(error => {
    console.error('Error en login:', error);
    throw error;
  });
}

  */

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
