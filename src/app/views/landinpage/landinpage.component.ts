import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import SitesComponent from '../../dashboard/pages/sites/sites.component';
import { Card1Component } from '../../components/card1/card1.component';
import { TipoLocalService } from '@services/tipo-local.service';
import { TipoLocal } from '@interfaces/tipo-local';

@Component({
  selector: 'app-landinpage',
  standalone: true,
  imports: [CommonModule, RouterModule, Card1Component],
  templateUrl: './landinpage.component.html',
  styleUrl: './landinpage.component.css',
})
export default class LandinpageComponent {
  [x: string]: any;
  // inject TipoLocalService
  public tLocalService = inject(TipoLocalService);
  public filteredLocales: any[] = []; // Aquí guardamos los locales filtrados
  filteredTipos: TipoLocal[] = [];
  isLoading: boolean = false;
  tipos = [
    'Quehacer',
    'Dondecomer',
    'Dondebeber',
    'Dondehospedarse',
    'Eventos',
  ];

  constructor(private router: Router) {
    // this.tLocalService.GetFilterByDescription('Donde comer');
    // this.getbtKLocal = this.tLocalService.GetFilterByDescription('Donde comer');
    // console.log(this.getbtKLocal);
  }

  ngOnInit(): void {
    // Llamar a GetTipoLocal solo si no hemos cargado los datos
    if (this.tLocalService.loading()) {
      this.tLocalService.GetTipoLocal(); // Cargar los datos
    }

    // Realizar la filtración por descripción
    // this.filterByDescription('Que hacer'); // Puedes cambiar 'Que hacer' a cualquier descripción que desees
  }

  navigateToDetail(tipo: string): void {
    console.log('Loading filtered types:', tipo);
    // this.isLoading = true;
    this.tLocalService.GetFilterByDescription(tipo).subscribe({
      next: (data) => {
        console.log('Filtered types:', data);
        this.filteredTipos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading filtered types:', err);
        this.isLoading = false;
      },
    });
    this.router.navigate(['/dashboard/sites', { type: tipo }]);
  }

  // Función para filtrar los datos por descripción
  // filterByDescription(description: string): void {
  //   this.filteredLocales =
  //     this.tLocalService.tLocalByDescription(description)(); // Obtiene los locales filtrados

  //   console.log(this.filteredLocales);
  // }
}