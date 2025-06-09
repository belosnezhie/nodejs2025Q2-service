import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { randomUUID } from 'crypto';
import { AlbumModel } from '../model/album.model';
import { Artist } from 'src/routes/artists/entities/artist.entity';
import { Track } from 'src/routes/tracks/entities/track.entity';

@Entity('albums')
export class Album {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('integer')
  year: number;

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @OneToMany(() => Track, (item: Track) => item.album)
  tracks: Track[];
}

export class AlbumEntity implements AlbumModel {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(partial: Pick<AlbumModel, 'name' | 'year' | 'artistId'>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.year = partial.year;
    this.artistId = partial.artistId ?? null;
  }
}
