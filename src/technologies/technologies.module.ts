import { Module } from '@nestjs/common';
import { TechnologyService } from './technology/technology.service';
import { TechnologyController } from './technology/technology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from 'src/entities/technology';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologyController],
  providers: [TechnologyService, JwtService],
})
export class TechnologiesModule {}
