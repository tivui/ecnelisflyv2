import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-legendtest',
  templateUrl: './legendtest.component.html',
  styleUrl: './legendtest.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LegendtestComponent implements AfterViewInit {

  private map: L.Map | undefined;

  ngAfterViewInit(): void {
    this.initMap();
    this.addLegend();
  }

  private initMap(): void {
    // Initialisation de la carte centrée sur Paris
    this.map = L.map('map').setView([48.8566, 2.3522], 13);

    // Ajout de la couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Exemple de points de données
    const points = [
      { lat: 48.8566, lng: 2.3522, name: "Point A", value: 10 },
      { lat: 48.8600, lng: 2.3500, name: "Point B", value: 15 },
      { lat: 48.8530, lng: 2.3499, name: "Point C", value: 20 }
    ];

    // Ajouter les points sur la carte
    points.forEach(point => {
      L.circleMarker([point.lat, point.lng], {
        radius: 8,
        fillColor: "blue",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`${point.name} : ${point.value}`).addTo(this.map!);
    });
  }

  private addLegend(): void {
    // Création de la légende dynamique
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = (map: L.Map) => {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `<h4>Légende dynamique</h4><div id="legend-content">Zoom : ${map.getZoom()}</div>`;
      return div;
    };

    legend.addTo(this.map!);

    // Fonction pour mettre à jour la légende en fonction du zoom
    const updateLegend = () => {
      const zoomLevel = this.map?.getZoom();
      let content = `<strong>Niveau de zoom :</strong> ${zoomLevel}<br>`;

      if (zoomLevel && zoomLevel >= 15) {
        content += "Détails des points visibles";
      } else {
        content += "Vue générale";
      }

      document.getElementById('legend-content')!.innerHTML = content;
    };

    // Mettre à jour la légende à chaque changement de zoom
    this.map?.on('zoomend', updateLegend);

    // Mettre à jour la légende au chargement initial
    updateLegend();
  }
}
