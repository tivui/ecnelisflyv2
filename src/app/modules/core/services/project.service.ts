import { Injectable } from '@angular/core';
import { LatLngBounds } from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  // Exemple de projets avec leurs coordonnées sous forme de polygones
  private projects = [
    {
      id: 1,
      name: 'Projet A',
      coordinates: [
        [48.8588443, 2.2943506],  // Tour Eiffel (point A)
        [48.857909, 2.295146],    // Point B
        [48.857510, 2.292486],    // Point C
        [48.8588443, 2.2943506],  // Retour au point A
      ],
    },
    {
      id: 2,
      name: 'Projet B',
      coordinates: [
        [48.8606111, 2.337644],   // Louvre (point A)
        [48.859297, 2.337983],    // Point B
        [48.859015, 2.336284],    // Point C
        [48.8606111, 2.337644],   // Retour au point A
      ],
    },
    {
      id: 3,
      name: 'Projet C',
      coordinates: [
        [48.861992, 2.329998],    // Place Vendôme (point A)
        [48.861489, 2.329754],    // Point B
        [48.861029, 2.329121],    // Point C
        [48.861992, 2.329998],    // Retour au point A
      ],
    },
  ];

  // Renvoie les projets dans la zone visible de la carte (bounding box)
  getProjectsInBounds(bounds: LatLngBounds) {
    // Logique pour filtrer les projets par bounds. Pour l'exemple, on renvoie tout.
    return this.projects;
  }
}
