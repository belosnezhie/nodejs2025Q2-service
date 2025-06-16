import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Album } from 'src/routes/albums/entities/album.entity';
import { Track } from 'src/routes/tracks/entities/track.entity';

@Entity('artists')
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
