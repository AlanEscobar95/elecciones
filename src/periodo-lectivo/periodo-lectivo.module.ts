import { Module } from '@nestjs/common';
import { PeriodoLectivoService } from './periodo-lectivo.service';
import { PeriodoLectivoController } from './periodo-lectivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoLectivoEntity } from './periodo-lectivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodoLectivoEntity])],
  providers: [PeriodoLectivoService],
  controllers: [PeriodoLectivoController]
})
export class PeriodoLectivoModule {}
