import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SectionsModule } from './sections/sections.module';
import { HobbiesModule } from './hobbies/hobbies.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ResumesModule } from './resumes/resumes.module';
import { CertificatesModule } from './certificates/certificates.module';
import { DomainsModule } from './domains/domains.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: 5432,
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: 'portfolio',
        autoLoadEntities: true,
        synchronize: true,
        entities: ['./entities/*.ts'],
        // logging: ['query', 'error'],
      }),
      inject: [ConfigService],
    }),
    SectionsModule,
    HobbiesModule,
    TechnologiesModule,
    ResumesModule,
    CertificatesModule,
    DomainsModule,
    ProjectsModule,
    AuthModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
