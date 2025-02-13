import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

