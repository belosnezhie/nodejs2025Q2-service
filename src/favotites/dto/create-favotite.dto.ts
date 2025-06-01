import { IsArray } from 'class-validator';

export class CreateFavotiteDto {
  @IsArray()
  artists: string[];

  @IsArray()
  albums: string[];

  @IsArray()
  tracks: string[];
}
