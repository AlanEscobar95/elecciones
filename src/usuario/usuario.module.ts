import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuario.entity';
import { RolesEntity } from 'src/rol/rol.entity';


@Module({
  imports:[TypeOrmModule.forFeature([UsuariosEntity,RolesEntity])],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}