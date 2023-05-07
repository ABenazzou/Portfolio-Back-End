import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TechnologyService } from './technology.service';
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
} from 'src/dtos/technologies.dtos';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('/api/technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  async getTechnologies(@Query('technologyName') technologyName: string) {
    if (technologyName !== undefined) {
      return this.technologyService.getTechnologyByName(technologyName);
    }
    return this.technologyService.getTechnologies();
  }

  @Get(':id')
  async getTechnologyById(@Param('id', ParseIntPipe) id: number) {
    return this.technologyService.getTechnologyById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createTechnology(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologyService.createTechnology(createTechnologyDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTechnology(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologyService.updateTechnology(id, updateTechnologyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTechnology(@Param('id', ParseIntPipe) id: number) {
    this.technologyService.deleteTechnology(id);
  }
}
