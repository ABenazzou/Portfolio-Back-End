import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBiographyDto } from 'src/dtos/biography.dtos';
import { CreateBiographyDto } from 'src/dtos/biography.dtos';
import { Biography } from 'src/entities/biography';
import { Repository } from 'typeorm';

@Injectable()
export class BiographyService {
  constructor(
    @InjectRepository(Biography)
    private readonly biographyRepository: Repository<Biography>,
  ) {}

  getBiography() {
    return this.biographyRepository.find();
  }

  getSortedBiography() {
    return this.biographyRepository.find({
      order: {
        end_year: 'DESC',
        start_year: 'DESC',
      },
    });
  }

  async getBiographyById(id: number) {
    const biography = await this.biographyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (biography) {
      return biography;
    }
    throw new HttpException('Biography not found', HttpStatus.NOT_FOUND);
  }

  async createBiography(createBiograpohyDto: CreateBiographyDto) {
    const newBiography = await this.biographyRepository.create(
      createBiograpohyDto,
    );
    await this.biographyRepository.save(newBiography);
    return newBiography;
  }

  async updateBiography(id: number, updateBiographyDto: UpdateBiographyDto) {
    await this.biographyRepository.update(id, updateBiographyDto);
    const updatedBiography = await this.getBiographyById(id);
    return updatedBiography;
  }

  async deleteBiography(id: number) {
    const deleteBiography = await this.biographyRepository.delete(id);
    if (!deleteBiography.affected) {
      throw new HttpException('Biography not found', HttpStatus.NOT_FOUND);
    }
  }
}
