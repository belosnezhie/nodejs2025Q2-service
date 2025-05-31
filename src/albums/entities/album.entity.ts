import { randomUUID } from 'crypto';
import { Album } from '../model/album.model';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(partial: Pick<Album, 'name' | 'year' | 'artistId'>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.year = partial.year;
    this.artistId = partial.artistId ?? null;
  }
}
