import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.vectorgrid';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../../../environments/environment';

interface AreaProperties {
  id: string;
  name: string;
  superficie: number;
  population: number;
  layer: string;
  color: string;
  opacity: number;
}

@Component({
  selector: 'app-maptestvectorgrid',
  templateUrl: './maptestvectorgrid.component.html',
  styleUrls: ['./maptestvectorgrid.component.scss']
})
export class MaptestvectorgridComponent implements OnInit {
  private map!: L.Map;
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  private loadedAreas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initMap();
    this.addBaseLayer();
    this.loadAreas(); this.map.on('zoomend', () => this.fetchAreasWithinBounds());
  }

  private fetchAreasWithinBounds(): void {
    const bounds = this.map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    // Loggez les limites
    console.log('Limites de la carte:', bounds);

    const filteredAreas = this.loadedAreas.filter(area => {
      // Vérifiez si le géométrie de la zone est un Polygon ou MultiPolygon
      const geometry = area.geom;

      // Ici, nous supposons que `area.geom` est de type GeoJSON
      if (geometry.type === 'Polygon') {
        return this.isGeometryInBounds(geometry.coordinates[0], northEast, southWest);
      } else if (geometry.type === 'MultiPolygon') {
        return geometry.coordinates.some((polygon: number[][][]) =>
          this.isGeometryInBounds(polygon[0], northEast, southWest)
        );
      }
      return false;
    });

    // Log des zones filtrées
    console.log('Zones dans les limites actuelles :', filteredAreas);
  }

  private isGeometryInBounds(coords: number[][], northEast: L.LatLng, southWest: L.LatLng): boolean {
    return coords.every(([lng, lat]) => {
      return (
        lat >= southWest.lat &&
        lat <= northEast.lat &&
        lng >= southWest.lng &&
        lng <= northEast.lng
      );
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [44.2, -1],
      zoom: 4,
    });
  }

  private addBaseLayer(): void {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private async loadAreas(): Promise<void> {
    const { data: areas, error } = await this.supabase
      .from('areas')
      .select('id, name, superficie, population, layer, color, opacity, geom');

    if (error) {
      console.error('Erreur lors de la récupération des données :', error);
      return;
    }

    this.loadedAreas = areas || [];
    console.log("Zones chargées depuis Supabase :", this.loadedAreas); // Log les zones chargées
    this.createVectorGrid();
  }

  private createVectorGrid(): void {
    if (!this.loadedAreas.length) {
      console.warn("Aucune zone chargée pour créer le VectorGrid.");
      return;
    }

    const geoJsonData: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: this.loadedAreas.map(area => ({
        type: 'Feature',
        properties: {
          id: area.id,
          name: area.name,
          superficie: area.superficie,
          population: area.population,
          layer: area.layer,
          color: area.color,
          opacity: area.opacity,
        } as AreaProperties,
        geometry: area.geom
      }))
    };

    // Log GeoJSON Data
    console.log("GeoJSON Data:", geoJsonData);

    const vectorGridLayer = L.vectorGrid.slicer(geoJsonData, {
      vectorTileLayerStyles: {
        sliced: {
          weight: 1,
          fillColor: '#9bc2c4',
          fillOpacity: 0.8,
          fill: true,
        }
      },
      interactive: true,
      getFeatureId: (feature: any) => feature.properties.id
    }).addTo(this.map);

    // console.log("coucou1")
    // vectorGridLayer.bindTooltip('coucou', {
    //   permanent: true, // The tooltip is always shown
    //   direction: 'top', // Positioning of the tooltip
    // });


    vectorGridLayer.on('click', (e: any) => {
      if (e.layer && e.layer.properties) {
        const properties = e.layer.properties;
        console.log(properties)
        const popup = L.popup()
          .setContent(`${properties.name}: ${properties.population} habitants`)
          .setLatLng(e.latlng)
          .openOn(this.map);

        const tooltip = L.tooltip().setContent('coucou').setLatLng(e.latlng).openOn(this.map)

        const clickStyle: L.PathOptions = {
          fillColor: properties.color || '#9bc2c4',
          fillOpacity: 1,
          color: 'black',
          weight: 2,
          opacity: 1,
          fill: true
        };

        vectorGridLayer.setFeatureStyle(properties.id, clickStyle);
      } else {
        console.warn('Layer or properties are not valid:', e.layer);
      }
    })

    this.addTooltipsAndLabels(vectorGridLayer, geoJsonData);
  }

  private addTooltipsAndLabels(vectorGridLayer: any, geoJsonData: GeoJSON.FeatureCollection) {
    geoJsonData.features.forEach(feature => {
      const properties = feature.properties as AreaProperties;
      const tooltipContent = `${properties.name} (${properties.population} habitants)`;
      const currentZoom = this.map.getZoom();
      console.log('Niveau de zoom actuel:', currentZoom);

      const area = properties.superficie; // Assurez-vous que la superficie est correctement définie
      const labelContent = properties.name + ' / ' + area;

      if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
        const coords = feature.geometry.type === 'Polygon' ? feature.geometry.coordinates : feature.geometry.coordinates[0];

        const centroid = this.calculateCentroid(coords[0]);
        console.log('Calculated Centroid:', centroid);

        const tootlTip = L.tooltip({
          direction: 'center',
          className: 'coucou-tooltip',
          offset: [0, -15], // Adjust the offset to place it above the polygon
          opacity: 1,
          permanent: true
        }).setContent(labelContent).setLatLng(centroid);

        if (this.isValidLatLng(centroid)) {
          console.log("centroid before grid", centroid);
          let isPermanent = false;
          // Appliquez les règles pour décider si le tooltip est permanent ou non
          if (currentZoom < 10) {
            if (area < 5000) {
              // Tooltip non permanent
            } else {
              tootlTip.addTo(this.map);
            }
          } else if (currentZoom < 12) {
            if (area < 100) {
              isPermanent = false; // Tooltip non permanent
            } else {
              tootlTip.addTo(this.map);
            }
          } else {
            tootlTip.addTo(this.map);
          }
          // Créer le tooltip
          // const tooltip = L.tooltip({
          //   direction: 'center',
          //   className: 'coucou-tooltip',
          //   offset: [0, -15], // Adjust the offset to place it above the polygon
          //   opacity: 1,
          //   permanent: true
          // }).setContent(tooltipContent).setLatLng(centroid);

        } else {
          console.warn('Invalid centroid:', centroid);
        }
      } else {
        console.warn('Unsupported geometry type:', feature.geometry.type);
      }
    });
  }


  private calculateCentroid(coords: number[][]): L.LatLngTuple {
    if (!coords || coords.length === 0) {
      console.warn('No coordinates provided for centroid calculation.');
      return [0, 0]; // Retourne un point par défaut si aucune coordonnée
    }

    const latSum = coords.reduce((sum, coord) => sum + coord[1], 0);
    const lngSum = coords.reduce((sum, coord) => sum + coord[0], 0);
    const centroid: L.LatLngTuple = [latSum / coords.length, lngSum / coords.length];

    // Vérifiez si le centroïde est valide
    if (!this.isValidLatLng(centroid)) {
      console.warn('Invalid centroid calculated:', centroid);
      return [0, 0]; // Retourne une valeur par défaut si invalide
    }

    return centroid; // Renvoie le centroïde
  }

  private isValidLatLng(latlng: L.LatLngTuple): boolean {
    return latlng[0] !== 0 && latlng[1] !== 0; // Remplacez par des vérifications plus robustes si nécessaire
  }
}
