import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { lastValueFrom, Observable } from 'rxjs';
import { ILogin } from '../interfaces/ilogin';
import { ISignUp } from '../interfaces/isignup';

export interface IAuthResponse {
  token: string;
  rol: string;      // <-- roles que envía tu backend
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/auth';
  private baseUrlAdmin: string = 'http://localhost:8083/admin';

  constructor() { }

  async login(login: ILogin): Promise<IAuthResponse> {
    try {
      const response = await lastValueFrom(this.httpClient.post<IAuthResponse>(`${this.baseUrl}/login`, login));
      if (response.token) {
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('rol', JSON.stringify(response.rol));
      }

      return response;
    } catch (err) {
      console.error('Error en login:', err);
      throw err;
    }
  }

  register(data: ISignUp): Observable<IUser> {
    return this.httpClient.post<IUser>(`${this.baseUrl}/signup`, data);
  }

  getAll(): Promise<IUser[]>{
    return lastValueFrom(this.httpClient.get<IUser[]>(this.baseUrlAdmin+"/usuarios", this.getAuthoritation()));
  }

  getByEmail(email: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(this.baseUrlAdmin+"/usuario/"+email, this.getAuthoritation()));
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

  update(user: IUser): Promise<number>{
    return lastValueFrom(this.httpClient.put<number>(this.baseUrlAdmin+"/usuario", user, this.getAuthoritation())); 
  }

  delete(email: string): Promise<number>{
    return lastValueFrom(this.httpClient.delete<number>(this.baseUrlAdmin+"/usuario/"+email, this.getAuthoritation()));
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