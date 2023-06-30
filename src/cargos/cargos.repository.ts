import { EntityRepository, Repository } from 'typeorm';
import { CargosEntity } from './cargos.entity';

@EntityRepository(CargosEntity)
export class CargosRepository extends Repository<CargosEntity>{}