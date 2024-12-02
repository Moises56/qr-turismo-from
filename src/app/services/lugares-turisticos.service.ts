import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { LugaresTuristicos } from '@interfaces/lugares-turisticos';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// interfaces State
export interface State {
  lugaresTuristicos: LugaresTuristicos[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LugaresTuristicosService {
  private http = inject(HttpClient);
  #state = signal<State>({
    loading: true,
    lugaresTuristicos: [],
  });

  // Signal computed property
  public lugares = computed(() => this.#state().lugaresTuristicos);
  public loading = computed(() => this.#state().loading);

  constructor() {}

  // llamada para obtener todos los lugares turisticos
  GetLugaresTuristicos() {
    if (this.#state().lugaresTuristicos.length === 0) {
      // Solo realiza la solicitud si no se han cargado datos previamente
      this.http
        .get<LugaresTuristicos[]>(`${environment.apiUrl}/lugares-turisticos`)
        .pipe(
          delay(1500),
          catchError((error) => {
            console.error('Error al obtener datos', error);
            // Establece los valores por defecto en caso de error
            this.#state.set({ loading: false, lugaresTuristicos: [] });
            return of([]); // Retorna un array vacío en caso de error
          })
        )
        .subscribe((res) => {
          this.#state.set({
            loading: false,
            lugaresTuristicos: res,
          });
        });
    }
  }
}
