import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from './model/favotites.model';
import { ArtistsService } from 'src/routes/artists/artists.service';
import { AlbumsService } from 'src/routes/albums/albums.service';
import { TracksService } from 'src/routes/tracks/tracks.service';
import { FavoritesRepository } from 'src/db/favorites.repository';

@Injectable()
export class FavotitesService {
  constructor(
    @Inject()
    private readonly favRepo: FavoritesRepository,
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
      await this.favRepo.createArtist(artist);
      return artist;
    } else if (type === 'album') {
      const album = await this.albumsRepo.shareOne(id);
      if (!album) {
        throw new UnprocessableEntityException(`Album doesn't exist`);
      }
      await this.favRepo.createAlbum(album);
      return album;
    } else {
      const track = await this.tracksRepo.shareOne(id);
      if (!track) {
        throw new UnprocessableEntityException(`Track doesn't exist`);
      }
      await this.favRepo.createTrack(track);
      return track;
    }
  }

  async findAll(): Promise<FavoritesResponse> {
    return await this.favRepo.findAll();
  }

  async delete(type: 'artist' | 'album' | 'track', id: string) {
    if (type === 'artist') {
      const artist = await this.favRepo.checkFavotiteArtist(id);
      if (!artist) {
        throw new NotFoundException('Artist not found.');
      }
      await this.favRepo.deleteArtist(id);
    } else if (type === 'album') {
      const album = await this.favRepo.checkFavotiteAlbum(id);
      if (!album) {
        throw new NotFoundException('Album not found.');
      }
      await this.favRepo.deleteAlbum(id);
    } else {
      const track = await this.favRepo.checkFavotiteTrack(id);
      if (!track) {
        throw new NotFoundException('Track not found.');
      }
      await this.favRepo.deleteTrack(id);
    }
  }

  async checkFavotite(
    type: 'artist' | 'album' | 'track',
    id: string,
  ): Promise<boolean> {
    if (type === 'artist') {
      return this.favRepo.checkFavotiteArtist(id);
    } else if (type === 'album') {
      return this.favRepo.checkFavotiteAlbum(id);
    } else {
      return this.favRepo.checkFavotiteTrack(id);
    }
  }
}
