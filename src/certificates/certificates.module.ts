import { Module } from '@nestjs/common';
import { CertificateController } from './certificate/certificate.controller';
import { CertificateService } from './certificate/certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from 'src/entities/certificate';
import { Domain } from 'src/entities/domain';
import { JwtService } from '@nestjs/jwt';
import { DomainService } from 'src/domains/domain/domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate, Domain])],
  controllers: [CertificateController],
  providers: [CertificateService, JwtService, DomainService],
})
export class CertificatesModule {}
