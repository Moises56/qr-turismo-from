import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { Router, RouterModule } from '@angular/router';
import { TipoLocalService } from '@services/tipo-local.service';
import { TipoLocal } from '@interfaces/tipo-local';
import { ParticulaNieveComponent } from '../particula-nieve/particula-nieve.component';

@Component({
  selector: 'app-card1',
  standalone: true,
  imports: [CommonModule, RouterModule, ParticulaNieveComponent],
  templateUrl: './card1.component.html',
  styleUrl: './card1.component.css',
})
export class Card1Component {
  // inject TipoLocalService
  @Input() title: string = ''; // Título pasado desde el landing
  public tLocalService = inject(TipoLocalService);
  filteredTipos: TipoLocal[] = [];
  isLoading: boolean = false;

  withShadow = true;
  isOpen: boolean = false;

  constructor(private router: Router) {
    this.tLocalService.GetTipoLocal();
  }

  ngOnInit(): void {
    this.loadFilteredTipos(this.title);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  loadFilteredTipos(description: string): void {
    // console.log('Card1 types:', description);
    this.isLoading = true;
    this.tLocalService.GetFilterByDescription(description).subscribe({
      next: (data) => {
        // console.log('Card1 Filtered types:', data);
        this.filteredTipos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading filtered types:', err);
        this.isLoading = false;
      },
    });
  }

  // Navegación al detalle con los datos cargados
  navigateToDetails(id: string): void {
    console.log('Navigate to:', id);
    //this.router.navigate(['/dashboard/sites', { id }]);
  }
}
