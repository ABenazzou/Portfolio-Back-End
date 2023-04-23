import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto, UpdateResumeDto } from 'src/dtos/resumes.dtos';

@Controller('api/resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  getResumes() {
    return this.resumeService.getResumes();
  }

  @Get('id/:id')
  async getResumeById(@Param('id', ParseIntPipe) id: number) {
    return this.resumeService.getResumeById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createResume(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.createResume(createResumeDto);
  }

  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateResume(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.updateResume(id, updateResumeDto);
  }

  @Delete('id/:id')
  async deleteResume(@Param('id', ParseIntPipe) id: number) {
    this.resumeService.deleteResume(id);
  }

  @Patch('id/:id/domain/:domain')
  async setResumeDomain(
    @Param('id', ParseIntPipe) id: number,
    @Param('domain') domainName: string,
  ) {
    return this.resumeService.setResumeDomain(id, domainName);
  }
}
