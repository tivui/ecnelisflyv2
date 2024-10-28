const fsv2 = require('fs');

// Définir les types GeoJSON
interface GeoJSONFeature {
  type: "Feature";
  properties: {
    name: string;
    superficie: number;
    population: number;
    layer: string;
    color: string;
    opacity: number;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][]; // Tableau 3D pour un polygone
  };
}

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Fonction pour générer une position aléatoire en France
function getRandomLatLngInFrancev2(): [number, number] {
  const minLat = 42.0; // Latitude minimale pour la France
  const maxLat = 51.0; // Latitude maximale pour la France
  const minLng = -5.0; // Longitude minimale pour la France
  const maxLng = 8.0;  // Longitude maximale pour la France

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  return [lat, lng];
}

// Fonction pour générer un polygone avec un nombre aléatoire de côtés (20 à 30)
function generatePolygonv2(center: [number, number], sides: number, baseSize: number): number[][] {
  const angleStep = (2 * Math.PI) / sides;
  const coordinates: number[][] = [];

  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep;

    // Introduire une variabilité aléatoire dans la distance, et une plage plus large pour la largeur
    const randomWidthOffset = (Math.random() - 0.5) * 0.3; // Variation de largeur plus importante
    const randomHeightOffset = (Math.random() - 0.5) * 0.1; // Variation de hauteur pour ajouter de l'irrégularité

    // Calcul des coordonnées avec la variabilité
    const lat = center[0] + (baseSize + randomHeightOffset) * Math.cos(angle);
    const lng = center[1] + (baseSize + randomWidthOffset) * Math.sin(angle);

    coordinates.push([lng, lat]); // Longitude en premier pour respecter le format GeoJSON
  }

  // GeoJSON polygon format requires the first and last point to be the same
  coordinates.push(coordinates[0]);

  return coordinates;
}

// Structure du fichier GeoJSON
const geojson: GeoJSONFeatureCollection = {
  type: "FeatureCollection",
  features: []
};

const colorsv2 = ['red', 'blue', 'green', 'yellow']; // 4 couleurs pour les couches
const baseSizev2 = 0.2; // Facteur de taille pour les polygones

for (let i = 1; i <= 300; i++) {
  const layerIndex = (i - 1) % 4; // 4 layers
  const layer = `Layer ${layerIndex + 1}`;
  const color = colorsv2[layerIndex]; // Sélection de la couleur correspondant au layer
  const center = getRandomLatLngInFrancev2();

  const sides = Math.floor(Math.random() * 10) + 10; // Nombre aléatoire de côtés (10 à 20)

  // Créer une feature GeoJSON
  const feature: GeoJSONFeature = {
    type: "Feature",
    properties: {
      name: `Zone ${i}`,
      superficie: Math.floor(Math.random() * 5000) + 3000, // Superficie (3000 à 8000)
      population: Math.floor(Math.random() * 10000), // Population aléatoire
      layer: layer,
      color: color,
      opacity: 0.15
    },
    geometry: {
      type: "Polygon",
      coordinates: [generatePolygonv2(center, sides, baseSizev2)] // Coordonnées du polygone
    }
  };

  // Ajouter la feature à la collection
  geojson.features.push(feature);
}

// Écrire les données dans un fichier GeoJSON
fsv2.writeFileSync('./src/assets/map-data/polygons.geojson', JSON.stringify(geojson, null, 2));

console.log('GeoJSON polygons data generated and saved.');
