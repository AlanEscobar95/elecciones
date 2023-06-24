import { UsuariosEntity } from './usuario.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UsuariosEntity)
export class UsuarioRepository extends Repository<UsuariosEntity> {   
}