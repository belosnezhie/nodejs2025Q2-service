import { MigrationInterface, QueryRunner } from 'typeorm';

export class Create1749327104803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE users (
          "id" UUID PRIMARY KEY,
          "login" TEXT NOT NULL,
          "password" TEXT NOT NULL,
          "version" INTEGER NOT NULL DEFAULT 1,
          "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `,
    );

    await queryRunner.query(
      `
        CREATE TABLE artists (
          "id" UUID PRIMARY KEY,
          "name" TEXT NOT NULL,
          "grammy" BOOLEAN NOT NULL
        )
      `,
    );

    await queryRunner.query(
      `
        CREATE TABLE albums (
            "id" UUID PRIMARY KEY,
            "name" TEXT NOT NULL,
            "year" INTEGER NOT NULL,
            "artistId" UUID NULL,
            CONSTRAINT fk_album_artist
              FOREIGN KEY ("artistId")
              REFERENCES artists("id")
              ON DELETE SET NULL
              ON UPDATE NO ACTION
        )
      `,
    );

    await queryRunner.query(
      `
        CREATE TABLE tracks (
          "id" UUID PRIMARY KEY,
          "name" TEXT NOT NULL,
          "duration" INTEGER NOT NULL,
          "artistId" UUID NULL,
          "albumId" UUID NULL,
          CONSTRAINT fk_track_artist
            FOREIGN KEY ("artistId")
            REFERENCES artists("id")
            ON DELETE SET NULL
            ON UPDATE NO ACTION,
          CONSTRAINT fk_track_album
            FOREIGN KEY ("albumId")
            REFERENCES albums("id")
            ON DELETE SET NULL
            ON UPDATE NO ACTION
        )
      `,
    );

    await queryRunner.query(
      `
        CREATE TABLE favorites (
          "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          "artists" UUID[] NOT NULL DEFAULT ARRAY[]::uuid[],
          "albums"  UUID[] NOT NULL DEFAULT ARRAY[]::uuid[],
          "tracks"  UUID[] NOT NULL DEFAULT ARRAY[]::uuid[]
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "tracks"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "albums"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "artists"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "favorites"`);
  }
}
