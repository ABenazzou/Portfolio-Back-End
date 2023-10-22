import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto, UpdateSectionDto } from 'src/dtos/sections.dtos';
import { section_type } from 'src/entities/section';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('api/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  async getSections(
    @Query('displayable') displayable: string,
    @Query('title') title: string,
  ) {
    if (displayable !== undefined && title !== undefined) {
      throw new HttpException(
        'Cannot combine displayable and title filters as title is unique',
        HttpStatus.BAD_REQUEST,
      );
    } else if (title !== undefined) {
      return this.sectionService.getSectionByTitle(title);
    } else if (displayable !== undefined) {
      return this.sectionService.getDisplayableSections();
    }
    return this.sectionService.getSections();
  }

  @Get('type/:type')
  getSectionsByType(
    @Param('type', new ParseEnumPipe(section_type)) type: section_type,
    @Query('displayable') displayable: string
  ) {
    if(displayable == undefined){
      return this.sectionService.getSectionByType(type);
    }
    return this.sectionService.getDisplayableSectionsByType(type);
  }

  @Get(':id')
  async geSectionById(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.getSectionById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.createSection(createSectionDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateSection(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.updateSection(id, updateSectionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSection(@Param('id', ParseIntPipe) id: number) {
    this.sectionService.deleteSection(id);
  }
}
