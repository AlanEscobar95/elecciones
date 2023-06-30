import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaModule } from './cronograma/cronograma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { ListasModule } from './listas/listas.module';
import { CarrerasModule } from './carreras/carreras.module';
import { TareasModule } from './tareas/tareas.module';
import { PeriodoLectivoModule } from './periodo-lectivo/periodo-lectivo.module';
import { TipoListasModule } from './tipo-listas/tipo-listas.module';
import { CargosModule } from './cargos/cargos.module';
import { EstadosModule } from './estado/estados.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CronogramaModule,
    UsuarioModule,
    RolModule,
    AuthModule,
    ListasModule,
    CarrerasModule,
    TareasModule,
    PeriodoLectivoModule,
    TipoListasModule,
    CargosModule,
    EstadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

