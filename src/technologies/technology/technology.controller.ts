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

  @UseGuards(AuthGuard)
  @Post()
  @Post()
  @UsePipes(ValidationPipe)
  async createTechnology(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologyService.createTechnology(createTechnologyDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateTechnology(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologyService.updateTechnology(id, updateTechnologyDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Delete('id/:id')
  async deleteTechnology(@Param('id', ParseIntPipe) id: number) {
    this.technologyService.deleteTechnology(id);
  }
}
