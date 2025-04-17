import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8083/api';

  constructor() { }

  login(login: ILogin): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl+"/login", login));
  }

}
