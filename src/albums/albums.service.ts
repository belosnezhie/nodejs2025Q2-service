import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './model/album.model';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

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

  async remove(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found.');
    }

    this.albums.splice(albumIndex, 1);
  }
}
