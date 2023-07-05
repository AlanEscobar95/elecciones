import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RolesEntity } from 'src/rol/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosEntity, RolesEntity, UsuarioRepository])],
  providers: [ResetPasswordService, UsuarioService],
  controllers: [ResetPasswordController]
})
export class ResetPasswordModule {}
