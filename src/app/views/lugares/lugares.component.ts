import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { LugaresTuristicosService } from '@services/lugares-turisticos.service';
import { LugaresTuristicos, Galeria } from '@interfaces/lugares-turisticos';
import { Card1Component } from '../../components/card1/card1.component';
import { MapComponent } from '../../components/map/map.component';
import { Eventos } from '@interfaces/eventos';
import { EventosService } from '@services/eventos.service';

@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [CommonModule, RouterModule, Card1Component, MapComponent],
  templateUrl: './lugares.component.html',
  styleUrl: './lugares.component.css',
})
export default class LugaresComponent {
  public tLocalService = inject(LugaresTuristicosService);
  public EvenService = inject(EventosService);
  public id: string | null = null;
  public Lugares: LugaresTuristicos[] = []; // Mantén esto como arreglo, aunque cargues uno solo
  public galeria: Galeria[] = [];
  // public Artistas: Artista[] = [];
  public events: Eventos[] = [];
  loading = true;

  tipos = [
    'Quehacer',
    'Dondecomer',
    'Dondebeber',
    'Dondehospedarse',
    'Eventos',
  ];

  //* historia modal Variable para controlar si el modal está abierto o cerrado
  public isModalOpen: boolean = false;
  public modalContent: string = ''; // Para almacenar el contenido del modal

  //* imagen seleccionada
  public selectedImage: string | null = null; // Para almacenar la imagen seleccionada
  public isImageModalOpen: boolean = false; // Controla si el modal está abierto

  //* Artista modal
  public isArtistasModalOpen: boolean = false;
  public selectedArtista: Eventos | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadSites();
    this.loadEvents();
  }

  loadSites() {
    if (this.id) {
      this.tLocalService.GetLugarTuristicosById(this.id).subscribe({
        next: (data) => {
          if (data) {
            this.Lugares = [data]; // Convertir en arreglo para mantener consistencia
            console.log('Lugares cargados:', this.Lugares);
            this.galeria = data.galeria || [];
            console.log('Galería cargada:', this.galeria);
          } else {
            console.warn('No se encontró información para el id:', this.id);
          }
        },
        error: (err) => {
          console.error('Error cargando lugar turístico:', err);
        },
      });
    } else {
      console.error('Error: el id es nulo');
    }
  }

  loadEvents(): void {
    this.EvenService.getEventos().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
        console.log('Eventos cargados:', this.events);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error cargando eventos:', err);
      },
    });
  }

  openModal(category: string) {
    console.log('Categoría seleccionada:', category);
    // this.isModalOpen = true; // Abrir el modal de Historia

    if (category === 'Historia') {
      this.modalContent = `Historia del lugar`;
      this.isModalOpen = true; // Abrir el modal de Historia
    } else if (category === 'Eventos') {
      this.modalContent = `Artistas Nacionales`; // Puedes ajustar el contenido según sea necesario
      this.isArtistasModalOpen = true; // Abrir el modal de Artistas/Eventos
    } else {
      console.warn('Categoría no reconocida:', category);
    }
  }

  closeModal() {
    this.isModalOpen = false; // Cerrar el modal
  }

  // imagen seleccionada
  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.selectedImage = null;
    this.isImageModalOpen = false;
  }

  // Artista modal
  closeArtistasModal() {
    this.isArtistasModalOpen = false;
  }
}
