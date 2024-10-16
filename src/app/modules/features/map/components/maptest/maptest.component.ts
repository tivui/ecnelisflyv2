import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import L, { latLng, tileLayer, polygon, Map, LatLngBounds } from 'leaflet';
import { FormControl } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrls: ['./maptest.component.scss']
})
export class MaptestComponent implements OnInit {
  public options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, minZoom: 1 })
    ],
    zoom: 14,
    center: L.latLng(48.8566, 2.29), // Paris comme centre par défaut
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  };

  public map!: Map;
  polygons: any[] = [];
  projects: any[] = [];       // Tous les projets disponibles dans la zone
  filteredProjects: any[] = [];  // Projets filtrés, affichés sur la carte et dans la sidenav
  searchControl: FormControl = new FormControl(''); // Création du FormControl pour la recherche

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Écoute les changements de valeur dans le champ de recherche
    this.searchControl.valueChanges.subscribe(value => {
      console.log("value", value)
      this.filterProjects(value);
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.loadProjects(map.getBounds());

    // Écoute les événements de zoom et de déplacement
    this.map.on('zoomend', () => this.onZoomEnd());
    this.map.on('moveend', () => this.onMoveEnd());
  }

  onZoomEnd() {
    this.loadProjects(this.map.getBounds());
    this.filterProjects(this.searchControl.value);  // Applique le filtre de recherche
  }

  onMoveEnd() {
    this.loadProjects(this.map.getBounds());
    this.filterProjects(this.searchControl.value);  // Applique le filtre de recherche
  }

  loadProjects(bounds: LatLngBounds) {
    // Obtenez les projets dans les bounds
    const projectsInBounds = this.projectService.getProjectsInBounds(bounds);

    // Assignez les projets récupérés à this.projects
    this.projects = projectsInBounds;

    this.clearPolygons();

    projectsInBounds.forEach(project => {
      if (project.coordinates.every(coord => coord.length === 2)) {
        const poly = polygon(project.coordinates as [number, number][]).addTo(this.map);
        this.polygons.push(poly);
      } else {
        console.error('Les coordonnées du projet ne sont pas valides', project.coordinates);
      }
    });

    // Mettre à jour les projets visibles dans la sidenav
    this.filteredProjects = this.filterProjectsInBounds(projectsInBounds, bounds);
    this.cdr.detectChanges();
  }

  filterProjects(value: string) {
    console.log("this.filteredProjects before", this.filteredProjects);
    console.log("this.projects before", this.projects);

    // Filtrage des projets en fonction de la recherche
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );

    // Mettez à jour les polygones sur la carte en fonction des projets filtrés
    this.updatePolygons();

    console.log("this.filteredProjects after", this.filteredProjects);
  }

  updatePolygons() {
    // Effacez tous les anciens polygones
    this.clearPolygons();

    // Dessinez les nouveaux polygones basés sur les projets filtrés
    this.filteredProjects.forEach(project => {
      if (project.coordinates.every((coord: string | any[]) => coord.length === 2)) {
        const poly = polygon(project.coordinates as [number, number][]).addTo(this.map);
        this.polygons.push(poly);
      } else {
        console.error('Les coordonnées du projet ne sont pas valides', project.coordinates);
      }
    });
  }

  filterProjectsInBounds(projects: any[], bounds: LatLngBounds): any[] {
    return projects.filter(project =>
      this.isProjectInBounds(project, bounds)
    );
  }

  isProjectInBounds(project: any, bounds: LatLngBounds): boolean {
    return project.coordinates.some((coord: [number, number]) => {
      const latLngPoint = latLng(coord[0], coord[1]);
      return bounds.contains(latLngPoint);
    });
  }

  clearPolygons() {
    this.polygons.forEach(polygon => this.map.removeLayer(polygon));
    this.polygons = [];
  }

  selectProject(project: any) {
    if (project.coordinates && project.coordinates.length > 0) {
      this.map.fitBounds(project.coordinates as [number, number][]);
    } else {
      this.map.setView([48.8566, 2.3522], this.map.getZoom());
    }
  }
}
