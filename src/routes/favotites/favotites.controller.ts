import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavotitesService } from './favotites.service';

@Controller('favs')
export class FavotitesController {
  constructor(private readonly favotitesService: FavotitesService) {}

  @Get()
  async findAll() {
    return await this.favotitesService.findAll();
  }

  @Post('/artist/:id')
  async createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favotitesService.create('artist', id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favotitesService.delete('artist', id);
  }

  @Post('/album/:id')
  async createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favotitesService.create('album', id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favotitesService.delete('album', id);
  }

  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favotitesService.create('track', id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favotitesService.delete('track', id);
  }
}
