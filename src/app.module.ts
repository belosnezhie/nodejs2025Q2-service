import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/user/users.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavotitesModule } from './routes/favotites/favotites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './routes/user/entities/user.entity';
import { Artist } from './routes/artists/entities/artist.entity';
import { Album } from './routes/albums/entities/album.entity';
import { Track } from './routes/tracks/entities/track.entity';
import { Favorites } from './routes/favotites/entities/favotite.entity';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavotitesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Artist, Album, Track, Favorites],
      synchronize: false,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
