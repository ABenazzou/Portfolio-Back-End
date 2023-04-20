import { Module } from '@nestjs/common';
import { SectionController } from './section/section.controller';
import { SectionService } from './section/section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entities/section';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionsModule {}
