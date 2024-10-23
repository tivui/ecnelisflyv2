import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-maptestlazyloading',
  templateUrl: './maptestlazyloading.component.html',
  styleUrls: ['./maptestlazyloading.component.scss']
})
export class MaptestlazyloadingComponent implements OnInit {
  private map!: L.Map;

  private layerGroups: { [key: string]: L.LayerGroup } = {
    'Layer 1': L.layerGroup(),
    'Layer 2': L.layerGroup(),
    'Layer 3': L.layerGroup(),
    'Layer 4': L.layerGroup(),
  };

  private dataUrl = 'assets/map-data/polygons.json';  // URL du fichier JSON
  private loadedPolygons: any[] = [];  // Stocke les polygones chargés
  private visibleLayers: { [key: string]: boolean } = {};  // Suivi des couches visibles

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initMap();
    this.addBaseLayer();
    this.loadPolygons();  // Charge les polygones une seule fois

    // Écoute l'événement de fin de déplacement pour ajouter des polygones visibles
    this.map.on('moveend', () => {
      this.filterAndAddPolygons();  // Filtre et ajoute les polygones en fonction des limites
      console.log("Loaded polygons in current bounds:", this.getPolygonsInBounds());
    });

    // Ajoute les couches de contrôle pour gérer l'affichage
    L.control.layers({}, {
      'Layer 1': this.layerGroups['Layer 1'],
      'Layer 2': this.layerGroups['Layer 2'],
      'Layer 3': this.layerGroups['Layer 3'],
      'Layer 4': this.layerGroups['Layer 4'],
    }).addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [44.2, -1],
      zoom: 9,
    });
  }

  private addBaseLayer(): void {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadPolygons(): void {
    // Charge les données depuis le fichier JSON une seule fois
    this.http.get<any[]>(this.dataUrl).subscribe((data: any[]) => {
      this.loadedPolygons = data;

      // Filtrer et ajouter uniquement les polygones visibles lors du chargement initial
      this.filterAndAddPolygons();
    });
  }

  private filterAndAddPolygons(): void {
    const bounds = this.map.getBounds();

    // Vider les groupes de couches avant d'ajouter de nouveaux polygones
    Object.values(this.layerGroups).forEach((layerGroup: L.LayerGroup) => layerGroup.clearLayers());

    const addedPolygons: any[] = []; // Tableau pour stocker les polygones ajoutés

    // Récupère les polygones à l'intérieur des limites
    this.loadedPolygons.forEach(polygon => {
      const latLng = L.latLng(polygon.lat, polygon.lng);

      // Vérifie si le polygone est dans les limites visibles
      if (bounds.contains(latLng)) {
        const areaColor = polygon.color;  // Utilise la couleur assignée dans les données

        // Crée le polygone avec la couleur et l'opacité spécifiées
        const layerPolygon = L.polygon(polygon.coordinates as L.LatLngExpression[], {
          color: areaColor,
          fillColor: areaColor,
          fillOpacity: polygon.opacity || 0.6,  // Utilise l'opacité définie, ou 0.6 par défaut
        }).bindPopup(`${polygon.name}<br>Superficie: ${polygon.superficie}<br>Population: ${polygon.population}`);

        // Ajoute le polygone à la couche appropriée
        this.layerGroups[polygon.layer].addLayer(layerPolygon);

        // Ajoute le polygone à la liste des polygones ajoutés
        addedPolygons.push(polygon);
      }
    });

    // Affiche les polygones ajoutés dans la console
    console.log("Added polygons on initial load:", addedPolygons);

    // Ajoute chaque couche à la carte si elle est visible
    Object.keys(this.layerGroups).forEach(layer => {
      if (!this.visibleLayers[layer]) {
        this.layerGroups[layer].addTo(this.map);
        this.visibleLayers[layer] = true;
      }
    });
  }

  private getPolygonsInBounds(): any[] {
    const bounds = this.map.getBounds();
    return this.loadedPolygons.filter(polygon => {
      const latLng = L.latLng(polygon.lat, polygon.lng);
      return bounds.contains(latLng);
    });
  }
}
