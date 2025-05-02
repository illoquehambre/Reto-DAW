import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IVacante } from '../interfaces/ivacante';

@Injectable({ providedIn: 'root' })
export class VacanteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8083/api/vacantes'; // Ajusta la URL si es necesario

  getAllVacantes(): Promise<IVacante[]> {
    const token = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return lastValueFrom(this.http.get<IVacante[]>(this.apiUrl, { headers }));
  }
}