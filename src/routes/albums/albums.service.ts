import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumModel } from './model/album.model';
import { TracksService } from 'src/routes/tracks/tracks.service';
import { FavotitesService } from 'src/routes/favotites/favotites.service';
import { AlbumsRepository } from 'src/db/albums.repository';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject()
    private readonly albumsRepo: AlbumsRepository,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksRepo: TracksService,
    @Inject(forwardRef(() => FavotitesService))
    private readonly favoritesRepo: FavotitesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumModel> {
    return await this.albumsRepo.create(createAlbumDto);
  }

  async findAll(): Promise<AlbumModel[]> {
    return await this.albumsRepo.findAll();
  }

  async findOne(id: string): Promise<AlbumModel> {
    const album = await this.albumsRepo.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found.');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumModel> {
    const album = await this.albumsRepo.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    return await this.albumsRepo.update(id, updateAlbumDto);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumsRepo.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    const tracks = await this.tracksRepo.findAllByAlbum(id);
    tracks.forEach((track) => {
      track.albumId = null;
    });

    if (await this.favoritesRepo.checkFavotite('album', id)) {
      await this.favoritesRepo.delete('album', id);
    }

    await this.albumsRepo.delete(id);
  }

  async findAllByArtist(artisId: string): Promise<AlbumModel[]> {
    return await this.albumsRepo.findAllByArtist(artisId);
  }

  async shareOne(id: string): Promise<AlbumModel | undefined> {
    return await this.albumsRepo.shareOne(id);
  }
}
