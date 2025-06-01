import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './model/artist.model';
import { ArtistEntity } from './entities/artist.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavotitesService } from 'src/favotites/favotites.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksRepo: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsRepo: AlbumsService,
    @Inject(forwardRef(() => FavotitesService))
    private readonly favoritesRepo: FavotitesService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = new ArtistEntity(createArtistDto);
    this.artists.push(artist);
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  async delete(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found.');
    }

    const tracks = await this.tracksRepo.findAllByArtist(id);
    tracks.forEach((track) => {
      track.artistId = null;
    });

    const albums = await this.albumsRepo.findAllByArtist(id);
    albums.forEach((album) => {
      album.artistId = null;
    });

    await this.favoritesRepo.delete('artist', id);

    this.artists.splice(artistIndex, 1);
  }

  async shareOne(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }
}
