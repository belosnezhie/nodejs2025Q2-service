import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from './model/favotites.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from './entities/favotite.entity';
import { Repository, In } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class FavotitesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favRepo: Repository<Favorites>,
    @InjectRepository(Artist)
    private readonly artistsRepo: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepo: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepo: Repository<Track>,
  ) {}

  async create(type: 'artist' | 'album' | 'track', id: string) {
    let [favorites] = await this.favRepo.find();
    if (!favorites) {
      favorites = new Favorites();
      await this.favRepo.save(favorites);
    }

    if (type === 'artist') {
      const artist = await this.artistsRepo.findOne({
        where: { id },
      });
      if (!artist) {
        throw new UnprocessableEntityException(`Artist doesn't exist`);
      }

      favorites.artists.push(artist.id);
      await this.favRepo.save(favorites);

      return artist;
    } else if (type === 'album') {
      const album = await this.albumsRepo.findOne({
        where: { id },
      });
      if (!album) {
        throw new UnprocessableEntityException(`Album doesn't exist`);
      }

      favorites.albums.push(album.id);
      await this.favRepo.save(favorites);

      return album;
    } else {
      const track = await this.tracksRepo.findOne({
        where: { id },
      });
      if (!track) {
        throw new UnprocessableEntityException(`Track doesn't exist`);
      }

      favorites.tracks.push(track.id);
      await this.favRepo.save(favorites);

      return track;
    }
  }

  async findAll(): Promise<FavoritesResponse> {
    const res: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const [favorites] = await this.favRepo.find();

    if (!favorites) {
      return res;
    }

    if (favorites.artists) {
      const artists = await this.artistsRepo.find({
        where: {
          id: In(favorites.artists),
        },
      });
      if (artists) {
        res.artists = artists;
      }
    }

    if (favorites.albums) {
      const albums = await this.albumsRepo.find({
        where: {
          id: In(favorites.albums),
        },
      });
      if (albums) {
        res.albums = albums;
      }
    }

    if (favorites.tracks) {
      const tracks = await this.tracksRepo.find({
        where: {
          id: In(favorites.tracks),
        },
      });
      if (tracks) {
        res.tracks = tracks;
      }
    }

    return res;
  }

  async delete(type: 'artist' | 'album' | 'track', id: string) {
    if (type === 'artist') {
      const [favorites] = await this.favRepo.find();
      const isFav = favorites.artists.includes(id);
      if (!isFav) {
        throw new NotFoundException('Artist not found.');
      }

      favorites.artists = favorites.artists.filter(
        (artistId) => artistId !== id,
      );

      await this.favRepo.save(favorites);
    } else if (type === 'album') {
      const [favorites] = await this.favRepo.find();
      const isFav = favorites.albums.includes(id);
      if (!isFav) {
        throw new NotFoundException('Album not found.');
      }
      favorites.albums = favorites.albums.filter((albumId) => albumId !== id);

      await this.favRepo.save(favorites);
    } else {
      const [favorites] = await this.favRepo.find();
      const isFav = favorites.tracks.includes(id);
      if (!isFav) {
        throw new NotFoundException('Track not found.');
      }
      favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);

      await this.favRepo.save(favorites);
    }
  }
}
