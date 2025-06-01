import { PartialType } from '@nestjs/mapped-types';
import { CreateFavotiteDto } from './create-favotite.dto';

export class UpdateFavotiteDto extends PartialType(CreateFavotiteDto) {}
