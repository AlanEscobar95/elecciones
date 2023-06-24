import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './rol.entity';


@Module({
  imports:[TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolService],
  controllers: [RolController]
})
export class RolModule {}
