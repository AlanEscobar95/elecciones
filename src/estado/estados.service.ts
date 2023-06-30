import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosEntity } from './estados.entity';
import { EstadosRepository } from './estados.repository';
import { EstadosDto } from './dto/estadosDto';

@Injectable()
export class EstadosService {
    constructor(
        @InjectRepository(EstadosEntity)
        private estadosRepository:EstadosRepository
    ){}

    async getAll(): Promise<EstadosEntity[]>{
        const estados = await this.estadosRepository.find();
        if(!estados.length){
            throw new NotFoundException({message: 'No hay estados registrados'});
        }
        return estados;
    }

    async findById(id:number): Promise<EstadosEntity>{
        const estados = await this.estadosRepository.findOne({where:{id:id}})
        if(!estados){
            throw new NotFoundException({message: 'no existe el estado'});
        }
        return estados;
    }

    async findByNombre(nombreEstado:string): Promise<EstadosEntity>{
        const estados = this.estadosRepository.findOne({where:{nombreEstado:nombreEstado}})
        return estados;
    }

    async create (dto: EstadosDto):Promise<any>{
        const estados = this.estadosRepository.create(dto);
        await this.estadosRepository.save(estados);
        return {message: `Estado ${estados.nombreEstado} creado`} 
    }

    async update(id: number, dto: EstadosDto): Promise<any>{
        const estados = await this.findById(id);
        if(!estados){
            throw new BadRequestException({message: 'Esta lista no existe'})
        }

        dto.nombreEstado ? estados.nombreEstado = dto.nombreEstado:estados.nombreEstado = estados.nombreEstado;

        await this.estadosRepository.save(estados);
        return {message: `Estado ${estados.nombreEstado} actualizado`}
    }

    async delete(id:number): Promise<any>{
        const estados = await this.findById(id);
        await this.estadosRepository.remove(estados)
        return {message: `Estado ${estados.nombreEstado} eliminado`}
    }

}