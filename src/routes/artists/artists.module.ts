import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/routes/albums/albums.module';
import { TracksModule } from 'src/routes/tracks/tracks.module';
import { FavotitesModule } from 'src/routes/favotites/favotites.module';
import { ArtistsRepository } from 'src/db/artists.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [
    AlbumsModule,
    TracksModule,
    forwardRef(() => FavotitesModule),
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
