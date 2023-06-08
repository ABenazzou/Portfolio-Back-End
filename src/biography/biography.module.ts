import { Module } from '@nestjs/common';
import { BiographyService } from './biography/biography.service';
import { BiographyController } from './biography/biography.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biography } from 'src/entities/biography';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Biography])],
  providers: [BiographyService, JwtService],
  controllers: [BiographyController],
})
export class BiographyModule {}
