import { Module } from '@nestjs/common';
import { VotosService } from './votos.service';
import { VotosController } from './votos.controller';
import { VotosEntity } from './votos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([VotosEntity])],
  providers: [VotosService],
  controllers: [VotosController]
})
export class VotosModule {}
