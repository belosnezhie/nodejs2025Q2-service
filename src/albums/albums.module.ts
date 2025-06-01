import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavotitesModule } from 'src/favotites/favotites.module';

@Module({
  imports: [TracksModule, forwardRef(() => FavotitesModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
