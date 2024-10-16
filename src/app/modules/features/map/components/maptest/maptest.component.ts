import { Component } from '@angular/core';
import L, { latLng, tileLayer, polygon, Map, LatLngBounds } from 'leaflet';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrls: ['./maptest.component.scss'] // Remarque : styleUrls et non styleUrl
})
export class MaptestComponent {
  public options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, minZoom: 9 })
    ],
    zoom: 9,
    center: L.latLng(-4.698904320291842, 11.637450551548591), // Exemple de coordonnées
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  };

  public map!: Map;
  polygons: any[] = [];
  projects: any[] = [];
  filteredProjects: any[] = [];

  constructor(private projectService: ProjectService) { }

  onMapReady(map: Map) {
    this.map = map;
    this.loadProjects(map.getBounds());

    // Écoute les événements de zoom et de déplacement
    this.map.on('zoomend', () => this.onZoomEnd());
    this.map.on('moveend', () => this.onMoveEnd());
  }

  onZoomEnd() {
    this.loadProjects(this.map.getBounds());
  }

  onMoveEnd() {
    this.loadProjects(this.map.getBounds());
  }

  loadProjects(bounds: LatLngBounds) {
    const projects = this.projectService.getProjectsInBounds(bounds);

    this.clearPolygons();

    projects.forEach(project => {
      if (project.coordinates.every(coord => coord.length === 2)) {
        const poly = polygon(project.coordinates as [number, number][]).addTo(this.map);
        this.polygons.push(poly);
      } else {
        console.error('Les coordonnées du projet ne sont pas valides', project.coordinates);
      }
    });

    // Mettre à jour les projets filtrés (par exemple dans la sidenav)
    this.filteredProjects = projects;
  }

  clearPolygons() {
    this.polygons.forEach(polygon => this.map.removeLayer(polygon));
    this.polygons = [];
  }

  selectProject(project: any) {
    // Logique pour centrer la carte sur un projet spécifique lors de la sélection dans la sidenav
    if (project.coordinates && project.coordinates.length > 0) {
      this.map.fitBounds(project.coordinates as [number, number][]);
    }
  }
}
