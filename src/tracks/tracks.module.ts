import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavotitesModule } from 'src/favotites/favotites.module';

@Module({
  imports: [forwardRef(() => FavotitesModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
