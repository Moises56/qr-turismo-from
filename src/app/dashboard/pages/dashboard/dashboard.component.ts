import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';
import { ParticleComponent } from '../../../components/particle/particle.component';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [RouterModule, SidemenuComponent, ParticleComponent, TitleComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export default class DashboardComponent {}
