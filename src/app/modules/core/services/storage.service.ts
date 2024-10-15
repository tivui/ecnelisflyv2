import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment'; // Vérifie que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private supabaseClient: SupabaseClient;

  constructor() {
    // Initialise le client Supabase avec l'URL et la clé API de l'environnement
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Méthode pour récupérer l'URL du fichier audio
  async getAudioFileUrl(path: string): Promise<string | null> {
    const { data } = this.supabaseClient
      .storage
      .from('sounds2')
      .getPublicUrl(path);

    return data?.publicUrl || null;
  }

  async getPresignedUrl(path: string): Promise<string | null> {
    console.log('Path utilisé pour l\'URL présignée:', path); // Log du chemin

    const { data, error } = await this.supabaseClient
      .storage
      .from('sounds2') // Assure-toi que c'est le bon nom de bucket
      .createSignedUrl(path, 60 * 5); // 60 * 5 = 5 minutes

    if (error) {
      console.error('Erreur lors de la récupération de l\'URL présignée:', error.message);
      return null;
    }

    return data?.signedUrl || null;
  }

}
