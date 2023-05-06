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
import { CertificateService } from './certificate.service';
import {
  CreateCertificateDto,
  UpdateCertificateDto,
} from 'src/dtos/certificates.dtos';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('api/certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  getCertificates() {
    return this.certificateService.getCertificates();
  }

  @Get('latest')
  getLatestCertificates() {
    return this.certificateService.getSortedCertificates();
  }

  @Get('id/:id')
  async getCertificateById(@Param('id', ParseIntPipe) id: number) {
    return this.certificateService.getCertificateById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createCertificate(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.createCertificate(createCertificateDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateCertificate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificateService.updateCertificate(id, updateCertificateDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Delete('id/:id')
  async deleteCertificate(@Param('id', ParseIntPipe) id: number) {
    this.certificateService.deleteCertificate(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Post('id/:id/domain/:domain')
  async addCertificateDomain(
    @Param('id', ParseIntPipe) id: number,
    @Param('domain') domainName: string,
  ) {
    return this.certificateService.addCertificateDomain(id, domainName);
  }
}
