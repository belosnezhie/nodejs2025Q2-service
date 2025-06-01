import { forwardRef, Module } from '@nestjs/common';
import { FavotitesService } from './favotites.service';
import { FavotitesController } from './favotites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavotitesController],
  providers: [FavotitesService],
  exports: [FavotitesService],
})
export class FavotitesModule {}
