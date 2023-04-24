import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCertificateDto,
  UpdateCertificateDto,
} from 'src/dtos/certificates.dtos';
import { Certificate } from 'src/entities/certificate';
import { Domain } from 'src/entities/domain';
import { Repository } from 'typeorm';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
  ) {}

  getCertificates() {
    return this.certificateRepository.find();
  }

  getSortedCertificates() {
    // order is either asc or desc
    return this.certificateRepository.find({
      relations: {
        domains: true,
      },
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
    await this.certificateRepository.save(newCertificate);
    return newCertificate;
  }

  async addCertificateDomain(id: number, domainName: string) {
    // to update once the domain service has been built
    const certificate = await this.getCertificateById(id);
    const domain = await this.domainRepository.findOne({
      where: {
        name: domainName,
      },
    });
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
