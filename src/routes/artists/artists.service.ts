import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistModel } from './model/artist.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { Favorites } from '../favotites/entities/favotite.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepo: Repository<Artist>,
    @InjectRepository(Favorites)
    private readonly favoritesRepo: Repository<Favorites>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistModel> {
    const artist: ArtistModel = {
      id: randomUUID(),
      ...createArtistDto,
    };
    return await this.artistsRepo.save(artist);
  }

  async findAll(): Promise<ArtistModel[]> {
    return await this.artistsRepo.find();
  }

  async findOne(id: string): Promise<ArtistModel> {
    const artist = await this.artistsRepo.findOne({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    const artist = await this.artistsRepo.findOne({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return await this.artistsRepo.save(artist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistsRepo.findOne({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    const [favorites] = await this.favoritesRepo.find();

    if (favorites && favorites.artists) {
      favorites.artists.filter((artisId) => artisId !== id);
      await this.favoritesRepo.save(favorites);
    }

    await this.artistsRepo.delete({
      id,
    });
  }

  async shareOne(id: string): Promise<ArtistModel | undefined> {
    return await this.artistsRepo.findOne({
      where: { id },
    });
  }
}
