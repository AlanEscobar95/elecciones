import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  authRepository: any;
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // Aquí se obtiene el secreto desde la configuración
      // ...otras opciones de configuración
    });
  }

  // Implementa el método validate() para verificar y decodificar el token
  async validate(payload: any) {
    // Aquí puedes realizar la lógica de validación y obtener los datos del token
    const{nombreUsuario,correo_electronico}=payload;
     const usuario = await this.authRepository.findOne({where:[{nombreUsuario},{correo_electronico}]});
     if(!usuario) new UnauthorizedException(new MessageDto('Usuario no encontrado'));
     return payload;
  }
}
