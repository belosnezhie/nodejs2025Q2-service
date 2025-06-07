import { Column, Entity } from 'typeorm';
import { FavoritesModel } from '../model/favotites.model';

@Entity('favorites')
export class Favorites {
  @Column('uuid', {
    array: true,
    default: () => 'ARRAY[]::uuid[]',
  })
  artists: string[];

  @Column('uuid', {
    array: true,
    default: () => 'ARRAY[]::uuid[]',
  })
  albums: string[];

  @Column('uuid', {
    array: true,
    default: () => 'ARRAY[]::uuid[]',
  })
  tracks: string[];
}

export class FavotiteEntity implements FavoritesModel {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
