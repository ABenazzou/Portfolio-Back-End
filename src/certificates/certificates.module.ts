import { Module } from '@nestjs/common';
import { CertificateController } from './certificate/certificate.controller';
import { CertificateService } from './certificate/certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from 'src/entities/certificate';
import { Domain } from 'src/entities/domain';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate, Domain])],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificatesModule {}
