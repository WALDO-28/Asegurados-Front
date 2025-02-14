import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Asegurado {
  id: number;
  numeroIdentificacion: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  valorEstimado: number;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {
  private apiUrl = 'http://localhost:5183/api/asegurado';

  constructor(private http: HttpClient) { }

  obtenerAsegurados(): Observable<Asegurado[]> {
    return this.http.get<Asegurado[]>(this.apiUrl);
  }
  // crearAsegurado(asegurado: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/crear`, asegurado).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 400) {
  //     return throwError(() => new Error(error.error || 'Número de identificación ya registrado.'));
  //   }
  //   return throwError(() => new Error('Error inesperado, intenta nuevamente.'));
  // }
  crearAsegurado(asegurado: Asegurado): Observable<Asegurado> {
    return this.http.post<Asegurado>(this.apiUrl, asegurado);
  }

  eliminarAsegurado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  ActualizarAsegurado (asegurado: Asegurado): Observable<Asegurado> {

    return this.http.put<Asegurado>(`${this.apiUrl}/${asegurado.id}`, asegurado);
    }
    
}

