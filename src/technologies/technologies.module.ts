import { Module } from '@nestjs/common';
import { TechnologyService } from './technology/technology.service';
import { TechnologyController } from './technology/technology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from 'src/entities/technology';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  providers: [TechnologyService],
  controllers: [TechnologyController],
})
export class TechnologiesModule {}
