import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/albums/model/album.model';
import { Track } from 'src/tracks/model/track.model';
import { Artist } from 'src/artists/model/artist.model';
import { Favorites, FavoritesResponse } from './model/favotites.model';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavotitesService {
  private albums: Album[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  private favoriteObjects: FavoritesResponse = {
    artists: this.artists,
    albums: this.albums,
    tracks: this.tracks,
  };

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsRepo: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsRepo: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksRepo: TracksService,
  ) {}

  async create(type: 'artist' | 'album' | 'track', id: string) {
    if (type === 'artist') {
      const artist = await this.artistsRepo.shareOne(id);
      if (!artist) {
        throw new UnprocessableEntityException(`Artist doesn't exist`);
      }
      this.artists.push(artist);
      this.favorites.artists.push(artist.id);
      return artist;
    } else if (type === 'album') {
      const album = await this.albumsRepo.shareOne(id);
      if (!album) {
        throw new UnprocessableEntityException(`Album doesn't exist`);
      }
      this.albums.push(album);
      this.favorites.albums.push(album.id);
      return album;
    } else {
      const track = await this.tracksRepo.shareOne(id);
      if (!track) {
        throw new UnprocessableEntityException(`Track doesn't exist`);
      }
      this.tracks.push(track);
      this.favorites.tracks.push(track.id);
      return track;
    }
  }

  async findAll(): Promise<FavoritesResponse> {
    return this.favoriteObjects;
  }

  async delete(type: 'artist' | 'album' | 'track', id: string) {
    if (type === 'artist') {
      const artistIndex = this.artists.findIndex((artist) => artist.id === id);
      if (artistIndex === -1) {
        throw new NotFoundException('Artist not found.');
      }
      this.artists.splice(artistIndex, 1);
      // this.favoriteObjects.artists.splice(artistIndex, 1);
      this.favorites.artists.splice(artistIndex, 1);
    } else if (type === 'album') {
      const albumIndex = this.albums.findIndex((album) => album.id === id);
      if (albumIndex === -1) {
        throw new NotFoundException('Album not found.');
      }
      this.albums.splice(albumIndex, 1);
      // this.favoriteObjects.albums.splice(albumIndex, 1);
      this.favorites.albums.splice(albumIndex, 1);
    } else {
      const trackIndex = this.tracks.findIndex((track) => track.id === id);
      if (trackIndex === -1) {
        throw new NotFoundException('Track not found.');
      }
      this.tracks.splice(trackIndex, 1);
      // this.favoriteObjects.tracks.splice(trackIndex, 1);
      this.favorites.tracks.splice(trackIndex, 1);
    }
  }
}
