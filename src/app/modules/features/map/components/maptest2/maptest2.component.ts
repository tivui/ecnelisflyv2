import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Geometry, Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke } from 'ol/style';
import { ProjectService } from '../../../../core/services/project.service';
import { XYZ } from 'ol/source';

@Component({
  selector: 'app-maptest2',
  templateUrl: './maptest2.component.html',
  styleUrl: './maptest2.component.scss'
})
export class Maptest2Component implements OnInit {
  public map!: Map;
  vectorLayer!: VectorLayer<VectorSource<Feature<Geometry>>>;
  vectorSource!: VectorSource<Feature<Geometry>>;
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Initialise la carte OpenLayers
    this.initMap();

    // Écoute les changements de valeur dans le champ de recherche
    this.searchControl.valueChanges.subscribe(value => {
      this.filterProjects(value);
    });
  }

  initMap() {
    // Source de données pour les polygones (projets)
    this.vectorSource = new VectorSource<Feature<Geometry>>();

    // Couche vectorielle pour les polygones
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 150, 255, 0.5)',
        }),
        stroke: new Stroke({
          color: '#00aaff',
          width: 2,
        }),
      }),
    });

    // Initialisation de la carte
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: fromLonLat([2.29, 48.8566]), // Paris
        zoom: 14,
        minZoom: 1,
        maxZoom: 18,
      }),
    });

    // Chargement initial des projets dans la zone actuelle
    this.loadProjects(this.map.getView().calculateExtent());

    // Gestion des événements de zoom et déplacement
    this.map.on('moveend', () => this.onMoveEnd());
  }

  onMoveEnd() {
    const extent = this.map.getView().calculateExtent();
    this.loadProjects(extent);
    this.filterProjects(this.searchControl.value);
  }

  loadProjects(extent: any) {
    const projectsInBounds = this.projectService.getProjectsOlInBounds(extent);

    setTimeout(() => {
      this.projects = projectsInBounds;
      this.filteredProjects = this.filterProjectsInBounds(this.projects, extent);
      this.updatePolygons();
    });
  }

  filterProjects(value: string) {
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    this.updatePolygons();
  }

  filterProjectsInBounds(projects: any[], extent: any): any[] {
    return projects.filter(project => this.isProjectInBounds(project, extent));
  }

  isProjectInBounds(project: any, extent: any): boolean {
    return project.coordinates.some((coord: [number, number]) => {
      const [lon, lat] = fromLonLat([coord[0], coord[1]]);
      return extent[0] <= lon && lon <= extent[2] && extent[1] <= lat && lat <= extent[3];
    });
  }

  updatePolygons() {
    // Effacez tous les polygones de la carte
    this.vectorSource.clear();

    // Ajoutez les nouveaux polygones filtrés
    this.filteredProjects.forEach(project => {
      if (project.coordinates.every((coord: string | any[]) => coord.length === 2)) {
        const polyCoords = project.coordinates.map((coord: [number, number]) => fromLonLat(coord));
        const poly = new Feature({
          geometry: new Polygon([polyCoords]),
        });
        this.vectorSource.addFeature(poly);
      }
    });
  }

  selectProject(project: any) {
    if (project.coordinates && project.coordinates.length > 0) {
      const polyCoords = project.coordinates.map((coord: [number, number]) => fromLonLat(coord));
      const polyExtent = new Polygon([polyCoords]).getExtent();
      this.map.getView().fit(polyExtent);
    }
  }
}
