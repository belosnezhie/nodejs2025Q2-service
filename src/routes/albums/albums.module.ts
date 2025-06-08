import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from 'src/db/albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Favorites } from '../favotites/entities/favotite.entity';
import { Artist } from '../artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Favorites, Artist])],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
})
export class AlbumsModule {}
