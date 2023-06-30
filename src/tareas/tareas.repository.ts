import {EntityRepository, Repository} from "typeorm";
import {TareasEntity} from "./tareas.entity";

@EntityRepository(TareasEntity)
export class TareasRepository extends Repository<TareasEntity>{
    findById(id: number) {
        throw new Error('Method not implemented.');
    }
}