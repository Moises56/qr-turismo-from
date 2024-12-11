// export interface LugaresTuristicos {
//   id: string;
//   key: string;
//   nombre: string;
//   ubicacion: string;
//   descripcion: string;
//   dias: string;
//   horarioEntrada: string;
//   horarioSalida: string;
//   historia: string;
//   baner: string;
//   createdAt: Date;
//   updatedAt: Date;
//   locales: any[];
//   eventos: any[];
// }

export interface LugaresTuristicos {
  id: string;
  key: string;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  dias: string;
  horarioEntrada: string;
  horarioSalida: string;
  historia: string;
  baner: string;
  createdAt: Date;
  updatedAt: Date;
  locales: any[];
  eventos: any[];
  galeria: Galeria[];
}

export interface Galeria {
  id: string;
  url: string;
  name: string;
  description: string;
  lugarId: string;
  createdAt: Date;
  updatedAt: Date;
}
