import { EntityRepository, Repository } from "typeorm";
import { VotosEntity } from "./votos.entity";

@EntityRepository(VotosEntity)
export class VotosRepository extends Repository<VotosEntity> {   
}