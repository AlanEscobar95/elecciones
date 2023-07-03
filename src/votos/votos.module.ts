import { Module } from '@nestjs/common';
import { VotosService } from './votos.service';
import { VotosController } from './votos.controller';
import { VotosEntity } from './votos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import { ListasEntity } from 'src/listas/listas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VotosEntity,UsuariosEntity,ListasEntity])],
  providers: [VotosService],
  controllers: [VotosController]
})
export class VotosModule {}
