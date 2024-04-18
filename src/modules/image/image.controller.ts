import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('/api/v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Get('/get-list')
  getAll() {
    return this.imageService.getAll();
  }
  @Get('/get-one/:id')
  @ApiParam({ name: 'id', description: 'Product detail ID' })
  getOne(@Param('id') id: string) {
    return this.imageService.getOne(id);
  }

  @Patch("/update/:id")
  @ApiParam({ name: 'id', description: 'Product detail ID' })
  updateDetail(@Body() body: UpdateImageDto, @Param('id') id: string) {
    return this.imageService.updateDetail(body, id);
  }

  @Delete("/delete/:id")
  @ApiParam({ name: 'id', description: 'Product detail ID' })
  deleteDetail(@Param('id') id: string) {
    return this.imageService.deleteDetail(id);
  }
}
