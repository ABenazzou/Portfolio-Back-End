import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDomainDto, UpdateDomainDto } from 'src/dtos/domains.dtos';
import { Domain } from 'src/entities/domain';
import { Repository } from 'typeorm';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
  ) {}

  getDomains() {
    return this.domainRepository.find();
  }

  async getDomainById(id: number) {
    const domain = await this.domainRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        projects: true,
        certificates: true,
        resume: true,
      },
    });
    if (domain) {
      return domain;
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }

  async getDomainByName(name: string) {
    const domain = await this.domainRepository.findOne({
      where: {
        name: name,
      },
      relations: {
        projects: true,
        certificates: true,
        resume: true,
      },
    });
    if (domain) {
      return domain;
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }

  async createDomain(createDomainDto: CreateDomainDto) {
    const newDomain = await this.domainRepository.create(createDomainDto);
    await this.domainRepository.save(newDomain);
    return newDomain;
  }

  async updateDomain(id: number, updateDomainDto: UpdateDomainDto) {
    await this.domainRepository.update(id, updateDomainDto);
    const updatedDomain = await this.getDomainById(id);
    return updatedDomain;
  }

  async deleteDomain(id: number) {
    // should delete relations in the future or check constraints at the very least
    const deleteDomain = await this.domainRepository.delete(id);
    if (!deleteDomain.affected) {
      throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
    }
  }
}
