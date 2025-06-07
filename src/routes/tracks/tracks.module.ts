import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavotitesModule } from 'src/routes/favotites/favotites.module';
import { TracksRepository } from 'src/db/tracks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  imports: [
    forwardRef(() => FavotitesModule),
    TypeOrmModule.forFeature([Track]),
  ],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
})
export class TracksModule {}
