import {
  IsString,
  IsNotEmpty,
  IsPositive,
  ValidateIf,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @ValidateIf((obj) => obj.albumId !== null)
  @IsUUID()
  albumId: string | null;

  @IsPositive()
  duration: number;
}
