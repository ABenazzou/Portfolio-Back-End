import { Module } from '@nestjs/common';
import { HobbyController } from './hobby/hobby.controller';
import { HobbyService } from './hobby/hobby.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hobby } from 'src/entities/hobby';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Hobby])],
  controllers: [HobbyController],
  providers: [HobbyService, JwtService],
})
export class HobbiesModule {}
