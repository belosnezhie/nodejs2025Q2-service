import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/routes/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/routes/albums/dto/update-album.dto';
import { AlbumModel } from 'src/routes/albums/model/album.model';
import { AlbumEntity } from 'src/routes/albums/entities/album.entity';

@Injectable()
export class AlbumsRepository {
  private albums: AlbumModel[] = [];

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumModel> {
    const album = new AlbumEntity(createAlbumDto);
    this.albums.push(album);
    return album;
  }

  async findAll(): Promise<AlbumModel[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<AlbumModel | undefined> {
    return this.albums.find((album) => album.id === id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumModel> {
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

  async findAllByArtist(artisId: string): Promise<AlbumModel[]> {
    return this.albums.filter((album) => album.artistId === artisId);
  }

  async shareOne(id: string): Promise<AlbumModel | undefined> {
    return this.albums.find((album) => album.id === id);
  }
}
