import { Component } from '@angular/core';
import L, { latLng, tileLayer, polygon, Map, LatLngBounds } from 'leaflet';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrl: './maptest.component.scss'
})
export class MaptestComponent {
  public options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, minZoom: 9 })
    ],
    zoom: 9,
    center: L.latLng(-4.698904320291842, 11.637450551548591),
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  };

  public map!: Map;
  polygons: any[] = [];

  constructor(private projectService: ProjectService) { }

  onMapReady(map: Map) {
    this.map = map;
    this.loadProjects(map.getBounds());
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
  }

  clearPolygons() {
    this.polygons.forEach(polygon => this.map.removeLayer(polygon));
    this.polygons = [];
  }
}
