import { forwardRef, Module } from '@nestjs/common';
import { FavotitesService } from './favotites.service';
import { FavotitesController } from './favotites.controller';
import { ArtistsModule } from 'src/routes/artists/artists.module';
import { AlbumsModule } from 'src/routes/albums/albums.module';
import { TracksModule } from 'src/routes/tracks/tracks.module';
import { FavoritesRepository } from 'src/db/favorites.repository';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavotitesController],
  providers: [FavotitesService, FavoritesRepository],
  exports: [FavotitesService],
})
export class FavotitesModule {}
