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
import { async } from 'rxjs';

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
    
        async findById(id:number): Promise<UsuariosEntity>{
            const usuario = await this.usuarioRepository.findOne({where:{id:id}})
            if(!usuario){
            throw new NotFoundException(new MessageDto('No existe ese usuario'));
            }
            return usuario;
        }

        async findByCorreo(correo_electronico:string): Promise<UsuariosEntity>{
            const usuario = await this.usuarioRepository.findOne({where:{correo_electronico:correo_electronico}})
            return usuario;
           }   
        
       async create(dto: CreateUsuarioDto): Promise<any> {
        const {correo_electronico} = dto;
        const exists = await this.usuarioRepository.findOne({where: [{correo_electronico: correo_electronico}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolAdmin = await this.rolRepository.findOne({where: {rolNombre: RolNombre.ADMINISTRADOR}});
        if(!rolAdmin) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const admin = this.usuarioRepository.create(dto);
        admin.roles = [rolAdmin];
        await this.usuarioRepository.save(admin);
        return new MessageDto('Administrador Creado con Exito');
    }  
    
    async update(id: number, dto: CreateUsuarioDto): Promise<any> {
        const usuario = await this.findById(id);
        if(!usuario)
        throw new BadRequestException(new MessageDto ('Ese usuario no existe'));
        dto.nombreRol ? usuario.nombreRol = dto.nombreRol : usuario.nombreRol = usuario.nombreRol;
        dto.nombre ? usuario.nombre = dto.nombre : usuario.nombre = usuario.nombre;
        dto.apellido ? usuario.apellido = dto.apellido : usuario.apellido = usuario.apellido;
        dto.carrera ? usuario.carrera = dto.carrera : usuario.carrera = usuario.carrera;
        dto.jornada ? usuario.jornada = dto.jornada : usuario.jornada = usuario.jornada;
        dto.correo_electronico ? usuario.correo_electronico = dto.correo_electronico : usuario.correo_electronico = usuario.correo_electronico;
        dto.password ? usuario.password = dto.password : usuario.password = usuario.password;
        dto.estado_usuario ? usuario.estado_usuario = dto.estado_usuario : usuario.estado_usuario = usuario.estado_usuario;
        dto.estado_voto ? usuario.estado_voto = dto.estado_voto : usuario.estado_voto = usuario.estado_voto;
        await this.usuarioRepository.save(usuario);
        return new MessageDto (`Usuario ${usuario.nombre} actualizado` );
    }

    async delete(id:number): Promise<any>{
        const usuario = await this.findById(id);
        await this.usuarioRepository.remove(usuario);
        return new MessageDto(`Usuario ${usuario.nombre} eliminado`);
    }

 }