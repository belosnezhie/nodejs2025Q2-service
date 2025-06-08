import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/routes/albums/albums.module';
import { TracksModule } from 'src/routes/tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Favorites } from '../favotites/entities/favotite.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Module({
  imports: [
    AlbumsModule,
    TracksModule,
    TypeOrmModule.forFeature([Artist, Favorites, Track, Album]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
