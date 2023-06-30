import{EntityRepository,Repository} from 'typeorm'
import {CarrerasEntity} from './carreras.entity'

@EntityRepository(CarrerasEntity)
export class CarrerasRepository extends Repository<CarrerasEntity> {}