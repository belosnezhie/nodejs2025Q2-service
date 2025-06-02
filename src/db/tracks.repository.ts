import { Injectable } from '@nestjs/common';
import { Track } from 'src/tracks/model/track.model';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { TrackEntity } from 'src/tracks/entities/track.entity';

@Injectable()
export class TracksRepository {
  private tracks: Track[] = [];

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = new TrackEntity(createTrackDto);
    this.tracks.push(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
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
