import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainService } from 'src/domains/domain/domain.service';
import { CreateResumeDto, UpdateResumeDto } from 'src/dtos/resumes.dtos';
import { Resume } from 'src/entities/resume';
import { Repository } from 'typeorm';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    private readonly domainService: DomainService,
  ) {}

  getResumes() {
    return this.resumeRepository.find();
  }

  async getResumeById(id: number) {
    const resume = await this.resumeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        domain: true,
      },
    });
    if (resume) {
      return resume;
    }
    throw new HttpException('Resume not found', HttpStatus.NOT_FOUND);
  }

  async createResume(createResumeDto: CreateResumeDto) {
    const newResume = await this.resumeRepository.create(createResumeDto);
    await this.resumeRepository.save(newResume);
    return newResume;
  }

  async setResumeDomain(id: number, domainName: string) {
    // should also add setting resume by id
    if (domainName === undefined) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const resume = await this.getResumeById(id);
    const domain = await this.domainService.getDomainByName(domainName);
    if (domain) {
      resume.domain = domain;
      await this.resumeRepository.save(resume);
      return this.getResumeById(id);
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }

  async updateResume(id: number, updateResumeDto: UpdateResumeDto) {
    await this.resumeRepository.update(id, updateResumeDto);
    const updatedResume = await this.getResumeById(id);
    return updatedResume;
  }

  async deleteResume(id: number) {
    const deleteResume = await this.resumeRepository.delete(id);
    if (!deleteResume.affected) {
      throw new HttpException('Resume not found', HttpStatus.NOT_FOUND);
    }
  }
}
