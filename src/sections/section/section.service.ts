import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionDto, UpdateSectionDto } from 'src/dtos/sections.dtos';
import { Section, section_type } from 'src/entities/section';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  getSections() {
    return this.sectionRepository.find();
  }

  getDisplayableSections() {
    return this.sectionRepository.find({
      where: {
        is_displayed: true,
      },
    });
  }

  getSectionByType(sectionType: section_type) {
    return this.sectionRepository.find({
      where: {
        type: sectionType,
      },
    });
  }

  async createSection(createSectionDto: CreateSectionDto) {
    const newSection = await this.sectionRepository.create(createSectionDto);
    await this.sectionRepository.save(newSection);
    return newSection;
  }

  async getSectionById(id: number) {
    const section = await this.sectionRepository.findOneBy({
      id: id,
    });
    if (section) {
      return section;
    }
    throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
  }

  async getSectionByTitle(title: string) {
    const section = await this.sectionRepository.findOneBy({
      title: title,
    });
    if (section) {
      return section;
    }
    throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
  }

  async updateSection(id: number, updateSectionDto: UpdateSectionDto) {
    await this.sectionRepository.update(id, updateSectionDto);
    const updatedSection = this.getSectionById(id);
    return updatedSection;
  }

  async deleteSection(id: number) {
    const deleteSection = await this.sectionRepository.delete(id);
    if (!deleteSection.affected) {
      throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
    }
  }
}
