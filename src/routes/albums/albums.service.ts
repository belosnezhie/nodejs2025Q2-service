import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumModel } from './model/album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Favorites } from '../favotites/entities/favotite.entity';
import { randomUUID } from 'crypto';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepo: Repository<Album>,
    @InjectRepository(Favorites)
    private readonly favoritesRepo: Repository<Favorites>,
    @InjectRepository(Artist)
    private readonly artistsRepo: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumModel> {
    const album: AlbumModel = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    return await this.albumsRepo.save(album);
  }

  async findAll(): Promise<AlbumModel[]> {
    return await this.albumsRepo.find();
  }

  async findOne(id: string): Promise<AlbumModel> {
    const album = await this.albumsRepo.findOne({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found.');
    }
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    const album = await this.albumsRepo.findOne({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found.');
    }
    const artistId = updateAlbumDto.artistId;
    const artist = await this.artistsRepo.findOne({
      where: { id: artistId },
      relations: { albums: true },
    });

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    if (artist) {
      album.artistId = updateAlbumDto.artistId;
      album.artist = artist;
    } else {
      album.artist = null;
    }

    return await this.albumsRepo.save(album);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumsRepo.findOne({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    const [favorites] = await this.favoritesRepo.find();

    if (favorites && favorites.albums) {
      favorites.albums.filter((albumId) => albumId !== id);
      await this.favoritesRepo.save(favorites);
    }

    await this.albumsRepo.delete({
      id,
    });
  }

  async findAllByArtist(artisId: string): Promise<AlbumModel[]> {
    return await this.albumsRepo.find({
      where: {
        artistId: artisId,
      },
    });
  }

  async shareOne(id: string): Promise<AlbumModel | undefined> {
    return await this.albumsRepo.findOne({
      where: { id },
    });
  }
}
