import { EntityRepository, Repository } from "typeorm";
import { EstadosEntity } from "./estados.entity";
import { ListasEntity } from "src/listas/listas.entity";

@EntityRepository(EstadosEntity)
export class EstadosRepository extends Repository<EstadosEntity>{
    
}