import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css',
})
export default class SitesComponent {
  siteName: string | null = null;
  title: string = 'Lugares';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.siteName = this.route.snapshot.paramMap.get('site');
  }
}
