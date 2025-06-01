import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './model/album.model';
import { AlbumEntity } from './entities/album.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { FavotitesService } from 'src/favotites/favotites.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksRepo: TracksService,
    @Inject(forwardRef(() => FavotitesService))
    private readonly favoritesRepo: FavotitesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = new AlbumEntity(createAlbumDto);
    this.albums.push(album);
    return album;
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found.');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  async delete(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found.');
    }

    const tracks = await this.tracksRepo.findAllByAlbum(id);
    tracks.forEach((track) => {
      track.albumId = null;
    });

    if (await this.favoritesRepo.checkFavotite('album', id)) {
      await this.favoritesRepo.delete('album', id);
    }

    this.albums.splice(albumIndex, 1);
  }

  async findAllByArtist(artisId: string): Promise<Album[]> {
    return this.albums.filter((album) => album.artistId === artisId);
  }

  async shareOne(id: string): Promise<Album | undefined> {
    return this.albums.find((album) => album.id === id);
  }
}
