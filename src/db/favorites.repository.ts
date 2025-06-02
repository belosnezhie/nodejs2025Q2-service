import { Injectable } from '@nestjs/common';
import { Track } from 'src/tracks/model/track.model';
import { Album } from 'src/albums/model/album.model';
import { Artist } from 'src/artists/model/artist.model';
import { FavoritesResponse } from 'src/favotites/model/favotites.model';

@Injectable()
export class FavoritesRepository {
  private albums: Album[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];

  async createArtist(artist: Artist): Promise<void> {
    this.artists.push(artist);
  }

  async createAlbum(album: Album): Promise<void> {
    this.albums.push(album);
  }

  async createTrack(track: Track): Promise<void> {
    this.tracks.push(track);
  }

  async findAll(): Promise<FavoritesResponse> {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  async deleteArtist(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistIndex, 1);
  }

  async deleteAlbum(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(albumIndex, 1);
  }

  async deleteTrack(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(trackIndex, 1);
  }

  async checkFavotiteArtist(id): Promise<boolean> {
    return this.artists.some((artist) => artist.id === id);
  }

  async checkFavotiteAlbum(id): Promise<boolean> {
    return this.albums.some((album) => album.id === id);
  }

  async checkFavotiteTrack(id): Promise<boolean> {
    return this.tracks.some((track) => track.id === id);
  }
}
