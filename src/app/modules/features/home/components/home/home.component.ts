import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../core/services/storage.service';
import { Track } from '@le2xx/ngx-audio-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Configuration du lecteur audio
  mssapDisplayTitle = false;
  mssapDisablePositionSlider = false;
  mssapDisplayRepeatControls = true;
  mssapDisplayVolumeControls = true;
  mssapDisplayVolumeSlider = false;

  // Playlist pour le lecteur audio
  mssapPlaylist: Track[] = [
    {
      title: 'Fireworks',
      link: '', // URL à remplir après récupération
      artist: 'Artiste Inconnu',
      duration: 120 // Durée en secondes, à ajuster
    }
  ];

  audioUrl: string | null = null;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadAudioFile();
  }

  async loadAudioFile() {
    const path = 'fireworks.wav'; // Chemin vers le fichier
    this.audioUrl = await this.storageService.getPresignedUrl(path);
    if (this.audioUrl) {
      this.mssapPlaylist[0].link = this.audioUrl; // Assigne l'URL à la playlist
      console.log("this.audioUrl", this.audioUrl); // Vérifie l'URL générée
    }
  }

  // Callback Events
  onEnded(event: any) {
    console.log('Track ended:', event);
  }
}
