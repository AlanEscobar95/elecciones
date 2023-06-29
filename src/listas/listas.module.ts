import { Module } from '@nestjs/common';
import { ListasService } from './listas.service';
import { ListasController } from './listas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListasEntity } from './listas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ListasEntity])],
  providers: [ListasService],
  controllers: [ListasController]
})
export class ListasModule {}
