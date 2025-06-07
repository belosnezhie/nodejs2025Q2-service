import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Album } from 'src/routes/albums/entities/album.entity';
import { ArtistModel } from '../model/artist.model';
import { Track } from 'src/routes/tracks/entities/track.entity';

@Entity('atrist')
export class Artist {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('boolean')
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}

export class ArtistEntity implements ArtistModel {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Pick<ArtistModel, 'name' | 'grammy'>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.grammy = partial.grammy;
  }
}
