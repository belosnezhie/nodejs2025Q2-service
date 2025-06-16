import { ArtistModel } from 'src/routes/artists/model/artist.model';
import { AlbumModel } from 'src/routes/albums/model/album.model';
import { TrackModel } from 'src/routes/tracks/model/track.model';

export interface FavoritesModel {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: ArtistModel[];
  albums: AlbumModel[];
  tracks: TrackModel[];
}
