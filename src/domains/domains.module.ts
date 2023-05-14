import { Module } from '@nestjs/common';
import { DomainController } from './domain/domain.controller';
import { DomainService } from './domain/domain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from 'src/entities/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Domain])],
  controllers: [DomainController],
  providers: [DomainService, JwtService],
})
export class DomainsModule {}
