import { EntityRepository, Repository } from 'typeorm';
import { UsuariosEntity } from './usuario.entity';

@EntityRepository(UsuariosEntity)
export class UsuarioRepository extends Repository<UsuariosEntity> {
}
