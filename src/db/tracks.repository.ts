import { Injectable } from '@nestjs/common';
import { TrackModel } from 'src/routes/tracks/model/track.model';
import { CreateTrackDto } from 'src/routes/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/routes/tracks/dto/update-track.dto';
import { TrackEntity } from 'src/routes/tracks/entities/track.entity';

@Injectable()
export class TracksRepository {
  private tracks: TrackModel[] = [];

  async create(createTrackDto: CreateTrackDto): Promise<TrackModel> {
    const track = new TrackEntity(createTrackDto);
    this.tracks.push(track);
    return track;
  }

  async findAll(): Promise<TrackModel[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<TrackModel | undefined> {
    return this.tracks.find((track) => track.id === id);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackModel> {
    const track = await this.findOne(id);

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  async delete(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    this.tracks.splice(trackIndex, 1);
  }

  async findAllByAlbum(albumId: string): Promise<TrackModel[]> {
    return this.tracks.filter((track) => track.albumId === albumId);
  }

  async findAllByArtist(artisId: string): Promise<TrackModel[]> {
    return this.tracks.filter((track) => track.artistId === artisId);
  }

  async shareOne(id: string): Promise<TrackModel | undefined> {
    return this.tracks.find((track) => track.id === id);
  }
}
