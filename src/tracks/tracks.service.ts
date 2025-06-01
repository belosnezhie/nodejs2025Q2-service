import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './model/track.model';
import { TrackEntity } from './entities/track.entity';
import { FavotitesService } from 'src/favotites/favotites.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavotitesService))
    private readonly favoritesRepo: FavotitesService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = new TrackEntity(createTrackDto);
    this.tracks.push(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found.');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  async delete(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found.');
    }

    if (await this.favoritesRepo.checkFavotite('track', id)) {
      await this.favoritesRepo.delete('track', id);
    }

    this.tracks.splice(trackIndex, 1);
  }

  async findAllByAlbum(albumId: string): Promise<Track[]> {
    return this.tracks.filter((track) => track.albumId === albumId);
  }

  async findAllByArtist(artisId: string): Promise<Track[]> {
    return this.tracks.filter((track) => track.artistId === artisId);
  }

  async shareOne(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === id);
  }
}
