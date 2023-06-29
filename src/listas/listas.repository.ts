import {EntityRepository,Repository} from 'typeorm';
import { ListasEntity } from './listas.entity';

@EntityRepository(ListasEntity)
export class ListasRepository extends Repository<ListasEntity>{}