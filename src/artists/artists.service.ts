import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './model/artist.model';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

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

    this.artists.splice(artistIndex, 1);
  }
}
