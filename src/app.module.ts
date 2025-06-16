import { MiddlewareConsumer, Module } from '@nestjs/common';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/user/users.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavotitesModule } from './routes/favotites/favotites.module';
import { AuthModule } from './routes/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './routes/user/entities/user.entity';
import { Artist } from './routes/artists/entities/artist.entity';
import { Album } from './routes/albums/entities/album.entity';
import { Track } from './routes/tracks/entities/track.entity';
import { Favorites } from './routes/favotites/entities/favotite.entity';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavotitesModule,
    LoggerModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.POSTGRES_USER || 'home_library_user',
      password: process.env.POSTGRES_PASSWORD || 'KqCQzyH2akGB9gQ4',
      database: process.env.POSTGRES_DB || 'home_library',
      entities: [User, Artist, Album, Track, Favorites],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
