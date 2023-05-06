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
import { DomainService } from './domain.service';
import { CreateDomainDto, UpdateDomainDto } from 'src/dtos/domains.dtos';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('api/domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  getDomains() {
    return this.domainService.getDomains();
  }

  @Get('id/:id')
  async getDomainById(@Param('id', ParseIntPipe) id: number) {
    return this.domainService.getDomainById(id);
  }

  @Get('name/:name')
  async getDomainByName(@Param('name') name: string) {
    return this.domainService.getDomainByName(name);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Post()
  @UsePipes(ValidationPipe)
  async createDomain(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.createDomain(createDomainDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateDomain(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDomainDto: UpdateDomainDto,
  ) {
    return this.domainService.updateDomain(id, updateDomainDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Delete('id/:id')
  async deleteDomain(@Param('id', ParseIntPipe) id: number) {
    this.domainService.deleteDomain(id);
  }
}
