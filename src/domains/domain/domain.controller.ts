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
import { DomainService } from './domain.service';
import { CreateDomainDto, UpdateDomainDto } from 'src/dtos/domains.dtos';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('api/domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  getDomains(@Query('name') name: string) {
    if (name !== undefined) {
      return this.domainService.getDomainByName(name);
    }
    return this.domainService.getDomains();
  }

  @Get(':id')
  async getDomainById(@Param('id', ParseIntPipe) id: number) {
    return this.domainService.getDomainById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createDomain(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.createDomain(createDomainDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateDomain(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDomainDto: UpdateDomainDto,
  ) {
    return this.domainService.updateDomain(id, updateDomainDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDomain(@Param('id', ParseIntPipe) id: number) {
    this.domainService.deleteDomain(id);
  }
}
