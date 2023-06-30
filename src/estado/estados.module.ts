import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosEntity } from './estados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadosEntity])],
  providers: [EstadosService],
  controllers: [EstadosController]
})
export class EstadosModule {}
