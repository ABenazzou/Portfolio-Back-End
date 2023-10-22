import { Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('api/maintenance')
export class MaintenanceController {
    constructor(
        private readonly maintenanceService: MaintenanceService,
      ) {}

      
    @Get()
    getMaintenance() {
      return this.maintenanceService.getMaintenance();
    }

    @UseGuards(AuthGuard)
    @Put()
    async setMaintenance(
    @Query('maintenance') maintenance: string
  ) {
    if (maintenance == undefined) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.maintenanceService.setMaintenance(maintenance);
  }

    
}
