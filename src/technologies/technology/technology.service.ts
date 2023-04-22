import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
} from 'src/dtos/technologies.dtos';
import { Technology } from 'src/entities/technology';
import { Repository } from 'typeorm';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  getTechnologies() {
    return this.technologyRepository.find();
  }

  async getTechnologyById(id: number) {
    const technology = await this.technologyRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        projects: true,
      },
    });
    if (technology) {
      return technology;
    }
    throw new HttpException('Technology not found', HttpStatus.NOT_FOUND);
  }

  async getTechnologyByName(name: string) {
    const technology = await this.technologyRepository.findOne({
      where: {
        name: name,
      },
      relations: {
        projects: true,
      },
    });
    if (technology) {
      return technology;
    }
    throw new HttpException('Technology not found', HttpStatus.NOT_FOUND);
  }

  async createTechnology(createTechnologyDto: CreateTechnologyDto) {
    const newTechnology = await this.technologyRepository.create(
      createTechnologyDto,
    );
    await this.technologyRepository.save(newTechnology);
    return newTechnology;
  }

  async updateTechnology(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    await this.technologyRepository.update(id, updateTechnologyDto);
    const updatedTechnology = await this.getTechnologyById(id);
    return updatedTechnology;
  }

  async deleteTechnology(id: number) {
    const deleteTechnology = await this.technologyRepository.delete(id);
    if (!deleteTechnology.affected) {
      throw new HttpException('Technology not found', HttpStatus.NOT_FOUND);
    }
  }
}
