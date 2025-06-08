import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackModel } from './model/track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Favorites } from '../favotites/entities/favotite.entity';
import { randomUUID } from 'crypto';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepo: Repository<Track>,
    @InjectRepository(Favorites)
    private readonly favoritesRepo: Repository<Favorites>,
    @InjectRepository(Album)
    private readonly albumsRepo: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistsRepo: Repository<Artist>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackModel> {
    const track: TrackModel = {
      id: randomUUID(),
      ...createTrackDto,
    };
    return await this.tracksRepo.save(track);
  }

  async findAll(): Promise<TrackModel[]> {
    return await this.tracksRepo.find();
  }

  async findOne(id: string): Promise<TrackModel> {
    const track = await this.tracksRepo.findOne({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException('Track not found.');
    }
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackModel> {
    const track = await this.tracksRepo.findOne({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    const artist = await this.artistsRepo.findOne({
      where: { id: updateTrackDto.artistId },
      relations: { tracks: true },
    });

    const album = await this.albumsRepo.findOne({
      where: { id: updateTrackDto.albumId },
      relations: { tracks: true },
    });

    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    if (artist) {
      track.artistId = updateTrackDto.artistId;
      track.artist = artist;
    } else {
      track.artist = null;
    }
    if (album) {
      track.albumId = updateTrackDto.albumId;
      track.album = album;
    } else {
      track.album = null;
    }

    return await this.tracksRepo.save(track);
  }

  async delete(id: string): Promise<void> {
    const track = await this.tracksRepo.findOne({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    const [favorites] = await this.favoritesRepo.find();

    if (favorites && favorites.tracks) {
      favorites.tracks.filter((trackId) => trackId !== id);
      await this.favoritesRepo.save(favorites);
    }

    await this.tracksRepo.delete({
      id,
    });
  }

  async shareOne(id: string): Promise<TrackModel | undefined> {
    return await this.tracksRepo.findOne({
      where: { id },
    });
  }
}
