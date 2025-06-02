import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/model/album.model';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Injectable()
export class AlbumsRepository {
  private albums: Album[] = [];

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = new AlbumEntity(createAlbumDto);
    this.albums.push(album);
    return album;
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album | undefined> {
    return this.albums.find((album) => album.id === id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  async delete(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    this.albums.splice(albumIndex, 1);
  }

  async findAllByArtist(artisId: string): Promise<Album[]> {
    return this.albums.filter((album) => album.artistId === artisId);
  }

  async shareOne(id: string): Promise<Album | undefined> {
    return this.albums.find((album) => album.id === id);
  }
}
