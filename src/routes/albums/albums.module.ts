import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/routes/tracks/tracks.module';
import { FavotitesModule } from 'src/routes/favotites/favotites.module';
import { AlbumsRepository } from 'src/db/albums.repository';

@Module({
  imports: [TracksModule, forwardRef(() => FavotitesModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
})
export class AlbumsModule {}
