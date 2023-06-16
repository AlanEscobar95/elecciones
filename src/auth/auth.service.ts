import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { MessageDto } from 'src/common/message.dto';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { RolNombre } from 'src/rol/rol.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository
    ) {}

    async getAll():Promise<UsuarioEntity[]>{
        const usuarios = await this.authRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('No existen usuarios'));
       return usuarios;
       }
    
    async create(dto: NuevoUsuarioDto): Promise<any> {
        const {correo_electronico} = dto;
        const exists = await this.authRepository.findOne({where: [{correo_electronico: correo_electronico}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolCandidato = await this.rolRepository.findOne({where: {rolNombre: RolNombre.CANDIDATO}});
        const rolVotante = await this.rolRepository.findOne({where: {rolNombre: RolNombre.VOTANTE}});
        if(!rolCandidato || !rolVotante) throw new InternalServerErrorException(new MessageDto('El usuario aún no ha sido creado'));
        const user = this.authRepository.create(dto);
        user.roles = [rolCandidato, rolVotante];
        await this.authRepository.save(user);
        return new MessageDto('Usuario creado correctamente');
    }
}
