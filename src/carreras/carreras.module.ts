import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrerasEntity } from './carreras.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CarrerasEntity])],
  providers: [CarrerasService],
  controllers: [CarrerasController]
})
export class CarrerasModule {}
