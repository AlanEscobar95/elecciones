import {EntityRepository, Repository} from "typeorm";
import { PeriodoLectivoEntity } from "./periodo-lectivo.entity";


@EntityRepository(PeriodoLectivoEntity)
export class PeriodoLectivoRepository extends Repository <PeriodoLectivoEntity>{}