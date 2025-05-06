import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ISolicitud } from "../interfaces/isolicitud";
import { lastValueFrom, Observable, switchMap } from "rxjs";
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class SolicitudService{
      private http = inject(HttpClient);
      private apiUrl = 'http://localhost:8083/api/solicitudes';
     
      constructor(private usuarioService: UserService) {}

      getMisSolicitudes$(): Observable<ISolicitud[]> {
        return this.usuarioService.loadUserProfile().pipe(           
          switchMap(user => {
            const token = localStorage.getItem('accessToken') || '';
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            });
            const url = `${this.apiUrl}/${encodeURIComponent(user.email)}`;
            return this.http.get<ISolicitud[]>(url, { headers });
          })
        );
        }

      getSolicitudesPorUsuario(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/contar`);
      }
}