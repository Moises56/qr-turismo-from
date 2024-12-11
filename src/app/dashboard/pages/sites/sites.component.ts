import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

import { ActivatedRoute } from '@angular/router';
import { LugaresTuristicosService } from '@services/lugares-turisticos.service';
import { LugaresTuristicos } from '@interfaces/lugares-turisticos';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css',
})
export default class SitesComponent {
  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.path !== '')
    .filter((route) => !route.path?.includes(':'));

  public tLocalService = inject(LugaresTuristicosService);
  isProfileMenuOpen = false;
  menuOpen: boolean = false;
  isMenuOpen = false; // Estado del menú
  siteName: string | null = null;
  title: string = 'Lugares';

  tipos = [
    'Quehacer',
    'Dondecomer',
    'Dondebeber',
    'Dondehospedarse',
    'Eventos',
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // AOS.init({
    //   duration: 1000, // Duración de la animación en ms
    //   easing: 'ease-in-out', // Estilo de animación
    //   once: true, // Ejecuta la animación solo una vez
    // });
    this.siteName = this.route.snapshot.paramMap.get('site');
    this.loadSites();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Llamada para obtener todos los lugares turisticos
  loadSites(): void {
    this.tLocalService.GetLugaresTuristicos();
    // console.log('Sites:', this.tLocalService.lugares);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
