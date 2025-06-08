import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Favorites } from '../favotites/entities/favotite.entity';
import { Artist } from '../artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Album, Favorites, Artist])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
