import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenanceService } from './maintenance/maintenance.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from 'src/entities/maintenance';

@Module({
  controllers: [MaintenanceController],
  providers: [MaintenanceService, JwtService],
  imports: [TypeOrmModule.forFeature([Maintenance])],
})
export class MaintenanceModule {}
