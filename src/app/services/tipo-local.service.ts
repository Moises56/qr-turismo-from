import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { TipoLocal } from '@interfaces/tipo-local';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// interfaces State
export interface State {
  tipoLocal: TipoLocal[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TipoLocalService {
  private http = inject(HttpClient);
  #state = signal<State>({
    loading: true,
    tipoLocal: [],
  });

  // Signal computed property to update the view when the data changes in the store (state) of the service (store)
  public tLocal = computed(() => this.#state().tipoLocal);
  public loading = computed(() => this.#state().loading);

  // signal computed by description
  public tLocalByDescription = (description: string) =>
    computed(() =>
      this.#state().tipoLocal.filter((tl) => tl.descripcion === description)
    );

  constructor() {}

  // Llamada para obtener todos los tipos de locales
  GetTipoLocal() {
    if (this.#state().tipoLocal.length === 0) {
      // Solo realiza la solicitud si no se han cargado datos previamente
      this.http
        .get<TipoLocal[]>(`${environment.apiUrl}/tipo-local`)
        .pipe(
          delay(1500),
          catchError((error) => {
            console.error('Error al obtener datos', error);
            // Establece los valores por defecto en caso de error
            this.#state.set({ loading: false, tipoLocal: [] });
            return of([]); // Retorna un array vacío en caso de error
          })
        )
        .subscribe((res) => {
          this.#state.set({
            loading: false,
            tipoLocal: res,
          });
        });
    }
  }
  // Llamada para obtener tipo local por descripción
  GetFilterByDescription(description: string) {
    // console.log('tLocal.service', description);
    return this.http
      .get<TipoLocal[]>(
        `${environment.apiUrl}/tipo-local/filter-by-description/${description}`
      )
      .pipe(
        delay(1500),
        catchError((error) => {
          console.error('Error al obtener datos', error);
          // Establece los valores por defecto en caso de error
          this.#state.set({ loading: false, tipoLocal: [] });
          return of([]); // Retorna un array vacío en caso de error
        })
      );

    // .subscribe((res) => {
    //   this.#state.set({
    //     loading: false,
    //     tipoLocal: res,
    //   });
    // });
  }
}
