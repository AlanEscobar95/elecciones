import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarrerasEntity } from './carreras.entity';
import { CarrerasRepository } from './carreras.repository';
import { CarrerasDto } from './dto/carreras.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class CarrerasService {
    constructor(
        @InjectRepository(CarrerasEntity)
        private carrerasRepository: CarrerasRepository
    ) { }

    async getAll(): Promise<CarrerasEntity[]> {
        const carreras = await this.carrerasRepository.find();
        if (!carreras.length) {
            throw new NotFoundException({ message: 'No hay ninguna carrera' })
        }
        return carreras;
    }

    async findById(id: number): Promise<CarrerasEntity> {
        const carrera = await this.carrerasRepository.findOne({ where: { id: id } });
        if (!carrera) {
            throw new NotFoundException({ message: 'No Existe la carrera' });
        }
        return carrera;
    }

    async findByNombre(nombreCarrera: string): Promise<CarrerasEntity> {
        const carrera = await this.carrerasRepository.findOne({where:{nombreCarrera:nombreCarrera}})
        return carrera;
    }
    
    async create(dto:CarrerasDto):Promise<any>{
        const carrera = this.carrerasRepository.create(dto);
        await this.carrerasRepository.save(carrera);
        return {message:`Carrera ${carrera.nombreCarrera} creada`};
    }

    async update(id:number, dto:CarrerasDto):Promise<any>{
        const carrera = await this.findById(id);
        if(!carrera)
        throw new BadRequestException(new MessageDto ('Esa carrera no existe'));
        dto.nombreCarrera ? carrera.nombreCarrera = dto.nombreCarrera : carrera.nombreCarrera = carrera.nombreCarrera;
        await this.carrerasRepository.save(carrera);
        return {message:`Carrera ${carrera.nombreCarrera} actualizada`};
    }
    
    async delete(id:number):Promise<any>{
        const carrera = await this.findById(id);
        await this.carrerasRepository.delete(id);
        return {message:`Carrera ${carrera.nombreCarrera} eliminada`};     
    }

} 

