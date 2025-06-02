import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavotitesModule } from 'src/favotites/favotites.module';
import { ArtistsRepository } from 'src/db/artists.repository';

@Module({
  imports: [AlbumsModule, TracksModule, forwardRef(() => FavotitesModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
