import { Module } from '@nestjs/common';
import { AdminService } from './admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService],
  controllers: [],
  exports: [AdminService],
})
export class AdminsModule {}
