import { UsuariosEntity } from './../usuario/usuario.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UsuariosEntity)
export class AuthRepository extends Repository<UsuariosEntity> {   
}