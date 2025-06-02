import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './model/track.model';
import { FavotitesService } from 'src/favotites/favotites.service';
import { TracksRepository } from 'src/db/tracks.repository';

@Injectable()
export class TracksService {
  constructor(
    @Inject()
    private readonly tracksRepo: TracksRepository,
    @Inject(forwardRef(() => FavotitesService))
    private readonly favoritesRepo: FavotitesService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksRepo.create(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return await this.tracksRepo.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracksRepo.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found.');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.tracksRepo.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return await this.tracksRepo.update(id, updateTrackDto);
  }

  async delete(id: string): Promise<void> {
    const track = await this.tracksRepo.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    if (await this.favoritesRepo.checkFavotite('track', id)) {
      await this.favoritesRepo.delete('track', id);
    }

    await this.tracksRepo.delete(id);
  }

  async findAllByAlbum(albumId: string): Promise<Track[]> {
    return await this.tracksRepo.findAllByAlbum(albumId);
  }

  async findAllByArtist(artisId: string): Promise<Track[]> {
    return await this.tracksRepo.findAllByArtist(artisId);
  }

  async shareOne(id: string): Promise<Track | undefined> {
    return await this.tracksRepo.shareOne(id);
  }
}
