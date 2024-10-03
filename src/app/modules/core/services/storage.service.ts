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
      .from('sounds') // Assure-toi que c'est le bon nom de bucket
      .createSignedUrl(path, 60 * 5); // 60 * 5 = 5 minutes

    if (error) {
      console.error('Erreur lors de la récupération de l\'URL présignée:', error.message);
      return null;
    }

    return data?.signedUrl || null;
  }

  // Méthode pour vérifier si le fichier existe
  async fileExists(path: string): Promise<boolean> {
    const { data, error } = await this.supabaseClient
      .storage
      .from('sounds2')
      .list(path);

    // Vérifie si une erreur s'est produite ou si le tableau est vide
    if (error) {
      console.error('Erreur lors de la vérification du fichier:', error.message);
      return false;
    }

    return data.length > 0; // Si le tableau n'est pas vide, le fichier existe
  }

  async listFiles(): Promise<void> {
    const { data, error } = await this.supabaseClient
      .storage
      .from('sounds2') // Remplace par le nom de ton bucket
      .list('');

    if (error) {
      console.error('Erreur lors de la liste des fichiers:', error.message);
      return;
    }

    console.log('Fichiers dans le bucket:', data);
  }

}
