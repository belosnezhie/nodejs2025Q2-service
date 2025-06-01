import { Artist } from 'src/artists/model/artist.model';
import { Album } from 'src/albums/model/album.model';
import { Track } from 'src/tracks/model/track.model';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
