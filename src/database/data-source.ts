import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from 'src/routes/user/entities/user.entity';
import { Artist } from 'src/routes/artists/entities/artist.entity';
import { Album } from 'src/routes/albums/entities/album.entity';
import { Track } from 'src/routes/tracks/entities/track.entity';
import { Favorites } from 'src/routes/favotites/entities/favotite.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'home_library_user',
  password: process.env.POSTGRES_PASSWORD || 'KqCQzyH2akGB9gQ4',
  database: process.env.POSTGRES_DB || 'home_library',
  synchronize: false,
  entities: [User, Artist, Album, Track, Favorites],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migration',
});
