import { randomUUID } from 'crypto';
import { TrackModel } from '../model/track.model';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from 'src/routes/artists/entities/artist.entity';
import { Album } from 'src/routes/albums/entities/album.entity';

@Entity('track')
export class Track {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('integer')
  duration: number;

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @Column('uuid', { nullable: true })
  albumId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;
}

export class TrackEntity implements TrackModel {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(
    partial: Pick<TrackModel, 'name' | 'artistId' | 'albumId' | 'duration'>,
  ) {
    this.id = randomUUID();
    this.name = partial.name;
    this.artistId = partial.artistId ?? null;
    this.albumId = partial.albumId ?? null;
    this.duration = partial.duration;
  }
}
