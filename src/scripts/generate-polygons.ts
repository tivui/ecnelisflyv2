const fs = require('fs');

// Fonction pour générer une position aléatoire en France
function getRandomLatLngInFrance() {
  const minLat = 42.0; // Latitude minimale pour la France
  const maxLat = 51.0; // Latitude maximale pour la France
  const minLng = -5.0; // Longitude minimale pour la France
  const maxLng = 8.0;  // Longitude maximale pour la France

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  return [lat, lng];
}

// Fonction pour générer un polygone avec un nombre aléatoire de côtés (20 à 30)
function generatePolygon(center: number[], sides: number, baseSize: number) {
  const angleStep = (2 * Math.PI) / sides;
  const coordinates = [];

  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep;

    // Introduire une variabilité aléatoire dans la distance, et une plage plus large pour la largeur
    const randomWidthOffset = (Math.random() - 0.5) * 0.3; // Variation de largeur plus importante
    const randomHeightOffset = (Math.random() - 0.5) * 0.1; // Variation de hauteur pour ajouter de l'irrégularité

    // Calcul des coordonnées avec la variabilité
    const lat = center[0] + (baseSize + randomHeightOffset) * Math.cos(angle);
    const lng = center[1] + (baseSize + randomWidthOffset) * Math.sin(angle);

    coordinates.push([lat, lng]);
  }

  return coordinates;
}

// Génération des données pour 100 polygones
const data = [];
const colors = ['red', 'blue', 'green', 'yellow']; // 4 couleurs pour les couches
const baseSize = 0.2; // Augmenter le facteur de taille pour des polygones plus larges

for (let i = 1; i <= 300; i++) {
  const layerIndex = (i - 1) % 4; // 4 layers
  const layer = `Layer ${layerIndex + 1}`;
  const color = colors[layerIndex]; // Sélection de la couleur correspondant au layer
  const center = getRandomLatLngInFrance();

  // Nombre aléatoire de côtés (entre 20 et 30)
  const sides = Math.floor(Math.random() * 10) + 10;

  const polygon = {
    name: `Zone ${i}`,
    lat: center[0],
    lng: center[1],
    superficie: Math.floor(Math.random() * 5000) + 3000, // Superficie aléatoire plus grande (3000 à 8000)
    population: Math.floor(Math.random() * 10000), // Population aléatoire
    layer: layer,
    color: color,
    opacity: 0.15, // Opacité mise à jour
    coordinates: generatePolygon(center, sides, baseSize), // Génération du polygone avec un facteur de taille
  };
  data.push(polygon);
}

// Écrire les données dans un fichier JSON
fs.writeFileSync('.././assets/map-data/polygons.json', JSON.stringify(data, null, 2));

console.log('Polygons data generated and saved.');
