import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainService } from 'src/domains/domain/domain.service';
import {
  CreateCertificateDto,
  UpdateCertificateDto,
} from 'src/dtos/certificates.dtos';
import { Certificate } from 'src/entities/certificate';
import { Repository } from 'typeorm';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private readonly domainService: DomainService,
  ) {}

  getCertificates() {
    return this.certificateRepository.find();
  }

  getSortedCertificates() {
    // order is either asc or desc
    return this.certificateRepository.find({
      order: {
        date_obtained: 'DESC',
      },
    });
  }

  async getCertificateById(id: number) {
    const certificate = await this.certificateRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        domains: true,
      },
    });
    if (certificate) {
      return certificate;
    }
    throw new HttpException('Certificate not found', HttpStatus.NOT_FOUND);
  }

  async createCertificate(createCertificateDto: CreateCertificateDto) {
    const newCertificate = await this.certificateRepository.create(
      createCertificateDto,
    );
    try {
      await this.certificateRepository.save(newCertificate);
    } catch (error) {
      throw new HttpException(
        'Certificate name or link already exists',
        HttpStatus.CONFLICT,
      );
    }
    return newCertificate;
  }

  async addCertificateDomain(id: number, domainName: string) {
    if (domainName === undefined) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const certificate = await this.getCertificateById(id);
    const domain = await this.domainService.getDomainByName(domainName);
    if (domain) {
      certificate.domains.push(domain);
      await this.certificateRepository.save(certificate);
      return this.getCertificateById(id);
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }

  async updateCertificate(
    id: number,
    updateCertificateDto: UpdateCertificateDto,
  ) {
    await this.certificateRepository.update(id, updateCertificateDto);
    const updatedCertificate = await this.getCertificateById(id);
    return updatedCertificate;
  }

  async deleteCertificate(id: number) {
    const deleteCertificate = await this.certificateRepository.delete(id);
    if (!deleteCertificate.affected) {
      throw new HttpException('Certificate not found', HttpStatus.NOT_FOUND);
    }
  }
}
