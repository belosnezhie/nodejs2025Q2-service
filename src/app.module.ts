import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/user/users.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavotitesModule } from './routes/favotites/favotites.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavotitesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
