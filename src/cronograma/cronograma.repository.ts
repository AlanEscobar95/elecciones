import {EntityRepository, Repository} from "typeorm";
import { CronogramasEntity } from "./cronograma.entity";

@EntityRepository(CronogramasEntity)
export class CronogramaRepository extends Repository<CronogramasEntity> {
    findOneOptions(id: number) {
        throw new Error('Method not implemented.');
    }

}