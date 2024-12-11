import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  title = 'map';
  markets: any[] = [];
  errorMessage: string = '';

  leafletMap!: L.Map;
  marker: L.Marker | undefined;

  tegucigalpaCoords = { lat: 14.105692339846442, lng: -87.20142066478729 };

  @Input({ required: true }) latitude!: string;
  @Input({ required: true }) longitude!: string;
  @Input({ required: true }) nameLugar!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {}

  @ViewChild('map', { static: false })
  mapElementRef!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  private initializeMap(): void {
    this.leafletMap = L.map(this.mapElementRef.nativeElement).setView(
      [parseFloat(this.latitude), parseFloat(this.longitude)],
      13
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafletMap);

    this.marker = L.marker([
      parseFloat(this.latitude),
      parseFloat(this.longitude),
    ])
      .addTo(this.leafletMap)
      .setIcon(
        L.icon({
          iconUrl: 'assets/icons/pin.png',
          iconSize: [30, 35],
          iconAnchor: [10, 31],
          popupAnchor: [1, -34],
        })
      )
      .bindPopup(`${this.nameLugar} - ${this.latitude}, Lon: ${this.longitude}`)
      .openPopup();

    this.setupMarkerEvents();
  }

  private setupMarkerEvents(): void {
    if (this.marker) {
      this.marker.on('move', (e) => {
        const marker = e.target;
        const position = marker.getLatLng();
        const text = `Lat: ${position.lat}, Lon: ${position.lng}`;

        navigator.clipboard.writeText(text).then(
          () => {
            console.log('Coordenadas copiadas al portapapeles:', text);
            this.latitude = position.lat.toString();
            this.longitude = position.lng.toString();
            localStorage.setItem('lat', position.lat.toString());
            localStorage.setItem('lng', position.lng.toString());
          },
          (err) => console.error('Error al copiar las coordenadas:', err)
        );

        marker
          .bindPopup(`Lat: ${position.lat}, Lon: ${position.lng}`)
          .openPopup();
      });

      this.leafletMap.on('click', (e) => {
        this.updateMarker(e.latlng.lat, e.latlng.lng);
      });
    }
  }

  updateMarker(lat: number, lng: number): void {
    if (this.leafletMap && this.marker) {
      this.marker.setLatLng([lat, lng]).openPopup();
      this.leafletMap.setView([lat, lng], 13);
    }
  }
}
