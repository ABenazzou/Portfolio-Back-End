import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from 'src/entities/maintenance';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class MaintenanceService {
    constructor(
        @InjectRepository(Maintenance)
        private readonly maintenanceRepository: Repository<Maintenance>,
      ) {}
    
      getMaintenance() {
        return this.maintenanceRepository.findOne({
            where:
            {
                id: 1,
            }
        });
      }

      async setMaintenance(maintenance: string) {
        const maintenanceObject = await this.getMaintenance();

        if (maintenanceObject) {
            if (maintenance == "turnon") {
                maintenanceObject.maintenanceBool = true;
                return this.maintenanceRepository.save(maintenanceObject);
            }
            else if (maintenance == "turnoff") {
                maintenanceObject.maintenanceBool = false;
                return this.maintenanceRepository.save(maintenanceObject);
            }
            else {
                throw new HttpException('Maintenance not found', HttpStatus.NOT_FOUND);
            }
        }
        throw new HttpException('Maintenance not found', HttpStatus.NOT_FOUND);
      }

}
