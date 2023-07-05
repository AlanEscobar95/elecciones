import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { MessageDto } from 'src/common/message.dto';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { RolNombre } from 'src/rol/rol.enum';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './payload.inteface';
import { RolesEntity } from 'src/rol/rol.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuariosEntity)
        private readonly authRepository: AuthRepository,
        private readonly usuarioRepository: UsuarioRepository,
        private readonly jwtService: JwtService
    ) { }

    async getAll(): Promise<UsuariosEntity[]> {
        const usuarios = await this.authRepository.find();
        if (!usuarios.length) throw new NotFoundException(new MessageDto('No existen usuarios'));
        return usuarios;
    }

    async findById(id:number): Promise<UsuariosEntity>{
        const usuario = await this.usuarioRepository.findOne({where:{id:id}})
        if(!usuario){
        throw new NotFoundException(new MessageDto('No existe ese usuario'));
        }
        return usuario;
    }

    async create(dto: NuevoUsuarioDto): Promise<any> {
        const { nombreRol, correo_electronico } = dto;
        const exists = await this.authRepository.findOne({ where: [{ nombreRol: nombreRol, correo_electronico: correo_electronico }] });
        if (exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolCandidato = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.CANDIDATO } });
        if (!rolCandidato) throw new InternalServerErrorException(new MessageDto('El usuario aún no ha sido creado'));
        const candidato = this.authRepository.create(dto);
        candidato.roles = [rolCandidato];
        await this.authRepository.save(candidato);
        return new MessageDto('Usuario creado correctamente');
    }

    async createVotante(dto: NuevoUsuarioDto): Promise<any> {
        const { nombreRol, correo_electronico } = dto;
        const exists = await this.authRepository.findOne({ where: [{ nombreRol: nombreRol, correo_electronico: correo_electronico }] });
        if (exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolVotante = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.VOTANTE } });
        if (!rolVotante) throw new InternalServerErrorException(new MessageDto('El usuario aún no ha sido creado'));
        const votante = this.authRepository.create(dto);
        votante.roles = [rolVotante];
        await this.authRepository.save(votante);
        return new MessageDto('Usuario creado correctamente');
    }

    async login(dto: LoginUsuarioDto): Promise<any> {
        const { correo_electronico } = dto;
        const usuario = await this.authRepository.findOne({ where: [{ correo_electronico: correo_electronico }] });
        if (!usuario) return new UnauthorizedException(new MessageDto('Usuario no encontrado'));
        const passwordOK = await compare(dto.password, usuario.password);
        if (!passwordOK) return new UnauthorizedException(new MessageDto('Contraseña Errónea'));
        const payload: PayloadInterface = {
            id: usuario.id,
            nombreRol: usuario.nombreRol,
            nombre: usuario.nombre,
            correo_electronico: usuario.correo_electronico,
            roles: usuario.roles.map(rol => rol.rolNombre as RolNombre)
        }
        const token = await this.jwtService.sign(payload);
        return { token };
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
}