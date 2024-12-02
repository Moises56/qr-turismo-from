import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './lugares.component.html',
  styleUrl: './lugares.component.css',
})
export default class LugaresComponent {}
