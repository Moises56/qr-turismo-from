import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

import { ActivatedRoute } from '@angular/router';
import { LugaresTuristicosService } from '@services/lugares-turisticos.service';
import { LugaresTuristicos } from '@interfaces/lugares-turisticos';
import { Card1Component } from '../../../components/card1/card1.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, RouterModule, Card1Component, NavbarComponent],
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
    this.siteName = this.route.snapshot.paramMap.get('site');
    this.loadSites();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
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
