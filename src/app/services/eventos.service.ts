import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Eventos } from '@interfaces/eventos';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener eventos:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  // Obtener evento por ID
  getEventoById(id: string): Observable<Eventos | null> {
    return this.http.get<Eventos>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener evento:', error);
        return of(null); // Retorna null en caso de error
      })
    );
  }

  // Crear un nuevo evento
  createEvento(evento: Partial<Eventos>): Observable<Eventos> {
    return this.http.post<Eventos>(this.apiUrl, evento).pipe(
      catchError((error) => {
        console.error('Error al crear evento:', error);
        return of({} as Eventos); // Retorna un objeto vacío en caso de error
      })
    );
  }

  // Actualizar un evento existente
  updateEvento(evento: Partial<Eventos>): Observable<Eventos> {
    return this.http
      .put<Eventos>(`${this.apiUrl}/${evento.idEvento}`, evento)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar evento:', error);
          return of({} as Eventos);
        })
      );
  }

  // Eliminar un evento por ID
  deleteEvento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar evento:', error);
        return of();
      })
    );
  }
}
