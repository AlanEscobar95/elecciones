import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { MessageDto } from 'src/common/message.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RolesEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { RolNombre } from 'src/rol/rol.enum';
import { In } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuariosEntity)
        private readonly usuarioRepository: UsuarioRepository
    ) {}

    async getAll():Promise<UsuariosEntity[]>{
        const usuarios = await this.usuarioRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('No existen usuarios'));
        return usuarios;
       }
    
       async create(dto: CreateUsuarioDto): Promise<any> {
        const {nombreRol, correo_electronico} = dto;
        const exists = await this.usuarioRepository.findOne({where: [{nombreRol: nombreRol}, {correo_electronico: correo_electronico}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolAdmin = await this.rolRepository.findOne({where: {rolNombre: RolNombre.ADMINISTRADOR}});
        if(!rolAdmin) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const admin = this.usuarioRepository.create(dto);
        admin.roles = [rolAdmin];
        await this.usuarioRepository.save(admin);
        return new MessageDto('Administrador Creado con Exito');
    }   
}