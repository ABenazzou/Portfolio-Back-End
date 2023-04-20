import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto, UpdateSectionDto } from 'src/dtos/sections.dtos';
import { section_type } from 'src/entities/section';

@Controller('api/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  getSections() {
    return this.sectionService.getSections();
  }

  @Get('id/:id')
  async geSectionById(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.getSectionById(id);
  }

  @Get('displayable')
  getDisplayableSections() {
    return this.sectionService.getDisplayableSections();
  }

  @Get('title/:title')
  getSectionByTitle(@Param('title') title: string) {
    return this.sectionService.getSectionByTitle(title);
  }

  @Get('type/:type')
  getSectionByType(
    @Param('type', new ParseEnumPipe(section_type)) type: section_type,
  ) {
    return this.sectionService.getSectionByType(type);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.createSection(createSectionDto);
  }

  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateSection(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.updateSection(id, updateSectionDto);
  }

  @Delete('id/:id')
  async deleteSection(@Param('id') id: number) {
    this.sectionService.deleteSection(id);
  }
}
