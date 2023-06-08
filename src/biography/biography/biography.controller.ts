import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BiographyService } from './biography.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import {
  CreateBiographyDto,
  UpdateBiographyDto,
} from 'src/dtos/biography.dtos';

@Controller('api/biography')
export class BiographyController {
  constructor(private readonly biographyService: BiographyService) {}

  @Get()
  getBiography() {
    return this.biographyService.getBiography();
  }

  @Get('sorted')
  getSortedBiography() {
    return this.biographyService.getSortedBiography();
  }

  @Get(':id')
  async getBiographyById(@Param('id', ParseIntPipe) id: number) {
    return this.biographyService.getBiographyById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createBiography(@Body() createBiograpohyDto: CreateBiographyDto) {
    return this.biographyService.createBiography(createBiograpohyDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateBiography(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBiographyDto: UpdateBiographyDto,
  ) {
    return this.biographyService.updateBiography(id, updateBiographyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBiography(@Param('id', ParseIntPipe) id: number) {
    return this.biographyService.deleteBiography(id);
  }
}
