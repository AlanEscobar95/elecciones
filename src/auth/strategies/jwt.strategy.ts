import { MessageDto } from './../../common/message.dto';
import { JWT_SECRET } from './../../config/constants';
import { ConfigService } from '@nestjs/config';

import { AuthRepository } from './../auth.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadInterface } from './payload.inteface';
import { UsuariosEntity } from 'src/usuario/usuario.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsuariosEntity)
        private readonly authRepository: AuthRepository,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: PayloadInterface) {
        const {nombreRol, correo_electronico} = payload;
        const usuario = await this.authRepository.findOne({where: [{nombreRol: nombreRol}, {correo_electronico: correo_electronico}]});
        if(!usuario) return new UnauthorizedException(new MessageDto('credenciales erróneas'));
        return payload;
    }
}
