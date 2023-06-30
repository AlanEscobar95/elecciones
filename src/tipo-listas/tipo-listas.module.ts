import { Module } from '@nestjs/common';
import { TipoListasService } from './tipo-listas.service';
import { TipoListasController } from './tipo-listas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoListasEntity } from './tipo-listas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TipoListasEntity])],
  providers: [TipoListasService],
  controllers: [TipoListasController]
})
export class TipoListasModule {}
