import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/routes/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/routes/artists/dto/update-artist.dto';
import { ArtistModel } from 'src/routes/artists/model/artist.model';
import { ArtistEntity } from 'src/routes/artists/entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private artists: ArtistModel[] = [];

  async create(createArtistDto: CreateArtistDto): Promise<ArtistModel> {
    const artist = new ArtistEntity(createArtistDto);
    this.artists.push(artist);
    return artist;
  }

  async findAll(): Promise<ArtistModel[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<ArtistModel | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistModel> {
    const artist = await this.findOne(id);

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  async delete(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    this.artists.splice(artistIndex, 1);
  }

  async shareOne(id: string): Promise<ArtistModel | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }
}
