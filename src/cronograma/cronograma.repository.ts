import {EntityRepository, Repository} from "typeorm";
import { CronogramaEntity } from "./cronograma.entity";

@EntityRepository(CronogramaEntity)
export class CronogramaRepository extends Repository<CronogramaEntity> {
    findOneOptions(id: number) {
        throw new Error('Method not implemented.');
    }

}