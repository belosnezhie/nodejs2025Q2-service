import {
  IsString,
  IsNotEmpty,
  IsPositive,
  ValidateIf,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  year: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID()
  artistId: string | null;
}
