import { Component, effect, EffectRef, OnInit, signal } from '@angular/core';
import { StorageService } from '../../../../core/services/storage.service';
import { Track } from '@le2xx/ngx-audio-player';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  public audioUrl = signal<string | null>(null);
  public loading = signal<boolean>(false);
  public volume = signal<number>(50);
  public volumeLabelStyle: { [key: string]: string } = {};
  public volumeEffect: EffectRef;

  // Layout
  cols = '3';

  displayMap = new Map([
    [Breakpoints.XSmall, '1'],
    [Breakpoints.Small, '1'],
    [Breakpoints.Medium, '2'],
    [Breakpoints.Large, '3'],
    [Breakpoints.XLarge, '3']
  ]);

  constructor(private storageService: StorageService, private breakpointObserver: BreakpointObserver) {
    // Responsivité
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.cols = this.displayMap.get(query) as string;
        }
      }
    });

    // Effet pour gérer le changement de volume
    this.volumeEffect = effect((onCleanup) => {
      const currentVolume = this.volume();

      let newStyle: { [key: string]: string } = {};

      if (currentVolume === 0) {
        newStyle = { color: 'gray', opacity: '0.5' };
      } else if (currentVolume > 80) {
        newStyle = { color: 'red' };
      } else {
        newStyle = { color: 'green' };
      }

      this.volumeLabelStyle = newStyle;

      // Minuterie pour afficher le volume après un délai
      const timer = setTimeout(() => {
        console.log(`Volume mis à jour après délai: ${currentVolume}`);
      }, 1000);

      // Enregistrement de la fonction de nettoyage
      onCleanup(() => {
        clearTimeout(timer); // Annuler la minuterie si l'effet est réexécuté ou si le composant est détruit
        console.log('Minuterie annulée');
      });

    });
  }

  ngOnInit(): void {
    this.loadAudioFile();
  }

  async loadAudioFile() {
    this.loading.set(true); // Indique que le chargement commence
    const path = 'fireworks.wav'; // Chemin vers le fichier
    const url = await this.storageService.getPresignedUrl(path);
    if (url) {
      this.audioUrl.set(url); // Met à jour le signal URL
      this.mssapPlaylist[0].link = url;
      console.log("this.audioUrl", url);
    }
    this.loading.set(false); // Indique que le chargement est terminé
  }

  onDownload() {
    console.log('Fichier audio téléchargé:', this.audioUrl());
    // Autres logiques comme afficher une notification
  }

  onVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.volume.set(Number(target.value)); // Mettre à jour le volume
  }

  // Callback Events
  onEnded(event: any) {
    console.log('Track ended:', event);
  }
}
