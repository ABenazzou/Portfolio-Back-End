import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHobbyDto, UpdateHobbyDto } from 'src/dtos/hobbies.dto';
import { Hobby } from 'src/entities/hobby';
import { Repository } from 'typeorm';

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobby)
    private readonly hobbyRepository: Repository<Hobby>,
  ) {}

  getHobbies() {
    return this.hobbyRepository.find();
  }

  async createHobby(createHobbyDto: CreateHobbyDto) {
    const newHobby = await this.hobbyRepository.create(createHobbyDto);
    try {
      await this.hobbyRepository.save(newHobby);
    } catch (error) {
      throw new HttpException('Hobby Name Already Exists', HttpStatus.CONFLICT);
    }
    return newHobby;
  }

  async getHobbyById(id: number) {
    const hobby = await this.hobbyRepository.findOneBy({
      id: id,
    });
    if (hobby) {
      return hobby;
    }
    throw new HttpException('Hobby not found', HttpStatus.NOT_FOUND);
  }

  async updateHobby(id: number, updateHobbyDto: UpdateHobbyDto) {
    await this.hobbyRepository.update(id, updateHobbyDto);
    const updatedHobby = this.getHobbyById(id);
    return updatedHobby;
  }

  async deleteHobby(id: number) {
    const deleteHobby = await this.hobbyRepository.delete(id);
    if (!deleteHobby.affected) {
      throw new HttpException('Hobby not found', HttpStatus.NOT_FOUND);
    }
  }
}
