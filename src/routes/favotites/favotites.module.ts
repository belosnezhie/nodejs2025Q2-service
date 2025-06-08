import { Module } from '@nestjs/common';
import { FavotitesService } from './favotites.service';
import { FavotitesController } from './favotites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favotite.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Artist, Album, Track])],
  controllers: [FavotitesController],
  providers: [FavotitesService],
})
export class FavotitesModule {}
