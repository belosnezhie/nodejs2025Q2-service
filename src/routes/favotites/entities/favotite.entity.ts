import { Favorites } from '../model/favotites.model';

export class Favotite implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
