import { randomUUID } from 'crypto';
import { Artist } from '../model/artist.model';

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Pick<Artist, 'name' | 'grammy'>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.grammy = partial.grammy;
  }
}
