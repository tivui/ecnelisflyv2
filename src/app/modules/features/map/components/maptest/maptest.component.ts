import { Component, ChangeDetectorRef } from '@angular/core';
import L, { latLng, tileLayer, polygon, Map, LatLngBounds } from 'leaflet';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrls: ['./maptest.component.scss']
})
export class MaptestComponent {
  public options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, minZoom: 1 })
    ],
    zoom: 15,
    center: L.latLng(48.8566, 2.29), // Paris comme centre par défaut
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  };

  public map!: Map;
  polygons: any[] = [];
  projects: any[] = [];       // Tous les projets disponibles dans la zone
  filteredProjects: any[] = [];  // Projets filtrés, affichés sur la carte et dans la sidenav

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) { }

  // Méthode appelée quand la carte est prête
  onMapReady(map: Map) {
    this.map = map;
    this.loadProjects(map.getBounds());

    // Écoute les événements de zoom et de déplacement
    this.map.on('zoomend', () => this.onZoomEnd());
    this.map.on('moveend', () => this.onMoveEnd());
  }

  // Méthode appelée à la fin du zoom
  onZoomEnd() {
    this.loadProjects(this.map.getBounds()); // Recharge les projets dans la zone visible
  }

  // Méthode appelée à la fin du déplacement de la carte
  onMoveEnd() {
    this.loadProjects(this.map.getBounds()); // Recharge les projets dans la zone visible
  }

  // Charge les projets qui sont dans les bounds visibles sur la carte
  loadProjects(bounds: LatLngBounds) {
    const projects = this.projectService.getProjectsInBounds(bounds);

    // Nettoyage des anciens polygones sur la carte
    this.clearPolygons();

    // Ajout des nouveaux polygones visibles sur la carte
    projects.forEach(project => {
      if (project.coordinates.every(coord => coord.length === 2)) {
        const poly = polygon(project.coordinates as [number, number][]).addTo(this.map);
        this.polygons.push(poly);
      } else {
        console.error('Les coordonnées du projet ne sont pas valides', project.coordinates);
      }
    });

    // Mettre à jour les projets visibles dans la sidenav
    this.filteredProjects = this.filterProjectsInBounds(projects, bounds);

    // Forcer la détection de changement après avoir mis à jour filteredProjects
    this.cdr.detectChanges();
  }

  // Filtre les projets qui sont dans les bounds visibles de la carte
  filterProjectsInBounds(projects: any[], bounds: LatLngBounds): any[] {
    return projects.filter(project =>
      this.isProjectInBounds(project, bounds)
    );
  }

  // Vérifie si un projet se trouve dans les bounds visibles de la carte
  isProjectInBounds(project: any, bounds: LatLngBounds): boolean {
    // On vérifie si au moins un point du projet est dans les bounds visibles
    return project.coordinates.some((coord: [number, number]) => {
      const latLngPoint = latLng(coord[0], coord[1]);
      return bounds.contains(latLngPoint);
    });
  }

  // Méthode pour supprimer tous les polygones précédents sur la carte
  clearPolygons() {
    this.polygons.forEach(polygon => this.map.removeLayer(polygon));
    this.polygons = [];
  }

  // Méthode appelée lors de la sélection d'un projet dans la sidenav
  selectProject(project: any) {
    // Logique pour centrer la carte sur un projet sélectionné dans la sidenav
    if (project.coordinates && project.coordinates.length > 0) {
      this.map.fitBounds(project.coordinates as [number, number][]);
    } else {
      // Centrer sur Paris si le projet n'a pas de coordonnées valides
      this.map.setView([48.8566, 2.3522], this.map.getZoom());
    }
  }
}
