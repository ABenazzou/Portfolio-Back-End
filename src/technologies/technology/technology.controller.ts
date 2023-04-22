import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TechnologyService } from './technology.service';
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
} from 'src/dtos/technologies.dtos';

@Controller('/api/technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  getTechnologies() {
    return this.technologyService.getTechnologies();
  }

  @Get('/id/:id')
  async getTechnologyById(@Param('id', ParseIntPipe) id: number) {
    return this.technologyService.getTechnologyById(id);
  }

  @Get('/name/:name')
  async getTechnologyByName(@Param('name') name: string) {
    return this.technologyService.getTechnologyByName(name);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTechnology(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologyService.createTechnology(createTechnologyDto);
  }

  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateTechnology(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologyService.updateTechnology(id, updateTechnologyDto);
  }

  @Delete('id/:id')
  async deleteTechnology(@Param('id', ParseIntPipe) id: number) {
    this.technologyService.deleteTechnology(id);
  }
}
