import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto, UpdateHobbyDto } from 'src/dtos/hobbies.dto';

@Controller('/api/hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}
  @Get()
  getHobbies() {
    return this.hobbyService.getHobbies();
  }

  @Get('id/:id')
  async getHobbyById(@Param('id', ParseIntPipe) id: number) {
    return this.hobbyService.getHobbyById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createHobby(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbyService.createHobby(createHobbyDto);
  }

  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async updateHobby(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHobbyDto: UpdateHobbyDto,
  ) {
    return this.hobbyService.updateHobby(id, updateHobbyDto);
  }

  @Delete('id/:id')
  async deleteHobby(@Param('id', ParseIntPipe) id: number) {
    this.hobbyService.deleteHobby(id);
  }
}
