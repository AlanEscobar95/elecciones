import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import { RolesEntity } from 'src/rol/rol.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';



@Module({
  imports:[
    TypeOrmModule.forFeature([UsuariosEntity,RolesEntity,AuthRepository]),
    PassportModule.register({

      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: 7200
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService,ConfigService,JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule,JwtStrategy]
})
export class AuthModule {}
