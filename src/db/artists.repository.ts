import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/model/artist.model';
import { ArtistEntity } from 'src/artists/entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private artists: Artist[] = [];

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = new ArtistEntity(createArtistDto);
    this.artists.push(artist);
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  async delete(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    this.artists.splice(artistIndex, 1);
  }

  async shareOne(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }
}
