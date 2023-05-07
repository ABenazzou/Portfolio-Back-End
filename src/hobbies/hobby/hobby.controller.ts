import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto, UpdateHobbyDto } from 'src/dtos/hobbies.dto';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('/api/hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}
  @Get()
  getHobbies() {
    return this.hobbyService.getHobbies();
  }

  @Get(':id')
  async getHobbyById(@Param('id', ParseIntPipe) id: number) {
    return this.hobbyService.getHobbyById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createHobby(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbyService.createHobby(createHobbyDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateHobby(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHobbyDto: UpdateHobbyDto,
  ) {
    return this.hobbyService.updateHobby(id, updateHobbyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteHobby(@Param('id', ParseIntPipe) id: number) {
    this.hobbyService.deleteHobby(id);
  }
}
