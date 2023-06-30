import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasEntity } from './tareas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TareasEntity])],
  providers: [TareasService],
  controllers: [TareasController]
})
export class TareasModule {}
