import {EntityRepository, Repository} from "typeorm";
import { CronogramasEntity } from "./cronograma.entity";

@EntityRepository(CronogramasEntity)
export class CronogramaRepository extends Repository<CronogramasEntity> {}