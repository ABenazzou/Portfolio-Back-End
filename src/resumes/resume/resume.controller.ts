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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto, UpdateResumeDto } from 'src/dtos/resumes.dtos';
import { AuthGuard } from 'src/auth/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post()
  @Post()
  @UsePipes(ValidationPipe)
  async createResume(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.createResume(createResumeDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateResume(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.updateResume(id, updateResumeDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Delete('id/:id')
  async deleteResume(@Param('id', ParseIntPipe) id: number) {
    this.resumeService.deleteResume(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Patch('id/:id/domain/:domain')
  async setResumeDomain(
    @Param('id', ParseIntPipe) id: number,
    @Param('domain') domainName: string,
  ) {
    return this.resumeService.setResumeDomain(id, domainName);
  }
}
