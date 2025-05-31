import { randomUUID } from 'crypto';
import { Track } from '../model/track.model';

export class TrackEntity implements Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(
    partial: Pick<Track, 'name' | 'artistId' | 'albumId' | 'duration'>,
  ) {
    this.id = randomUUID();
    this.name = partial.name;
    this.artistId = partial.artistId ?? null;
    this.duration = partial.duration;
  }
}
