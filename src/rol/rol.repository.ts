import { RolesEntity } from "./rol.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RolesEntity)
export class RolRepository extends Repository<RolesEntity> {   
}