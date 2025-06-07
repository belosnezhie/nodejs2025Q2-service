import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/routes/tracks/tracks.module';
import { FavotitesModule } from 'src/routes/favotites/favotites.module';
import { AlbumsRepository } from 'src/db/albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  imports: [
    TracksModule,
    forwardRef(() => FavotitesModule),
    TypeOrmModule.forFeature([Album]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
})
export class AlbumsModule {}
