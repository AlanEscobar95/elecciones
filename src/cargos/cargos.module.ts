import { Module } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CargosController } from './cargos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargosEntity } from './cargos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CargosEntity])],
  providers: [CargosService],
  controllers: [CargosController]
})
export class CargosModule {}
