import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistModel } from './model/artist.model';
import { TracksService } from 'src/routes/tracks/tracks.service';
import { AlbumsService } from 'src/routes/albums/albums.service';
import { FavotitesService } from 'src/routes/favotites/favotites.service';
import { ArtistsRepository } from 'src/db/artists.repository';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject()
    private readonly artistsRepo: ArtistsRepository,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksRepo: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsRepo: AlbumsService,
    @Inject(forwardRef(() => FavotitesService))
    private readonly favoritesRepo: FavotitesService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistModel> {
    return await this.artistsRepo.create(createArtistDto);
  }

  async findAll(): Promise<ArtistModel[]> {
    return await this.artistsRepo.findAll();
  }

  async findOne(id: string): Promise<ArtistModel> {
    const artist = await this.artistsRepo.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistModel> {
    const artist = await this.artistsRepo.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return await this.artistsRepo.update(id, updateArtistDto);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistsRepo.findOne(id);
    if (!artist) {
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

    if (await this.favoritesRepo.checkFavotite('artist', id)) {
      await this.favoritesRepo.delete('artist', id);
    }

    await this.artistsRepo.delete(id);
  }

  async shareOne(id: string): Promise<ArtistModel | undefined> {
    return await this.artistsRepo.shareOne(id);
  }
}
