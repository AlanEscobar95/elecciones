import { EntityRepository, Repository } from "typeorm";
import { TipoListasEntity } from "./tipo-listas.entity";

@EntityRepository(TipoListasEntity)
export class TipoListasRepository extends Repository<TipoListasEntity> {}