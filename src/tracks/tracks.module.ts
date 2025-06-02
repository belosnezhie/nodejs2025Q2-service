import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavotitesModule } from 'src/favotites/favotites.module';
import { TracksRepository } from 'src/db/tracks.repository';

@Module({
  imports: [forwardRef(() => FavotitesModule)],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
})
export class TracksModule {}
