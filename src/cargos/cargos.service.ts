import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CargosEntity } from './cargos.entity';
import { MessageDto } from 'src/common/message.dto';
import { CargosRepository } from './cargos.repository';
import { CargosDto } from './dto/cargos.dto';


@Injectable()
export class CargosService {
    constructor(
        @InjectRepository(CargosEntity)
        private cargosRepository: CargosRepository
    ) { }

    async getAll(): Promise<CargosEntity[]> {
        const cargos = await this.cargosRepository.find();
        if (!cargos.length) {
            throw new NotFoundException({ message: 'No hay ningun cargo' })
        }
        return cargos;
    }

    async findById(id: number): Promise<CargosEntity> {
        const cargo = await this.cargosRepository.findOne({ where: { id: id } });
        if (!cargo) {
            throw new NotFoundException({ message: 'No Existe el cargo' });
        }
        return cargo;
    }

    async findByNombre(nombreCargo: string): Promise<CargosEntity> {
        const cargo = await this.cargosRepository.findOne({where:{nombreCargo:nombreCargo}})
        return cargo;
    }

    async create(dto:CargosDto):Promise<any>{
        const cargo= this.cargosRepository.create(dto);
        await this.cargosRepository.save(cargo);
        return {message:`Cargo ${cargo.nombreCargo} creado`};
    }

    async update(id: number, dto: CargosDto): Promise<any> {
        const cargo = await this.findById(id);
        if (!cargo)
          throw new BadRequestException(new MessageDto('Ese cargo no existe'));
        const exists = await this.findByNombre(dto.nombreCargo);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('Ese cargo ya existe'));
        dto.nombreCargo ? cargo.nombreCargo = dto.nombreCargo : cargo.nombreCargo = cargo.nombreCargo;
        await this.cargosRepository.save(cargo);
        return new MessageDto(`Cargo ${cargo.nombreCargo} actualizado`);
      }
    
    async delete(id:number):Promise<any>{
        const cargo = await this.findById(id);
        await this.cargosRepository.delete(id);
        return {message:`Cargo ${cargo.nombreCargo} eliminado`};     
    }

}