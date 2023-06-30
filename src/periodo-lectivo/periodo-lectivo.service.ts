import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodoLectivoDto } from './dto/periodo-lectivo.dto';
import { PeriodoLectivoEntity } from './periodo-lectivo.entity';
import { PeriodoLectivoRepository } from './periodo-lectivo.respository';
import { MessageDto } from 'src/common/message.dto';


@Injectable()
export class PeriodoLectivoService {

    constructor(
        @InjectRepository(PeriodoLectivoEntity)
        private periodoLectivoRepository: PeriodoLectivoRepository
    ){ }

    async getAll(): Promise<PeriodoLectivoEntity[]> {
        const periodoLectivo = await this.periodoLectivoRepository.find();

        if (!periodoLectivo.length) {
            throw new NotFoundException({ message: 'El periodo está vacío' });
        }
        return periodoLectivo;
    }
    
    async findById(id: number): Promise<PeriodoLectivoEntity> {
        const periodoLectivo = await this.periodoLectivoRepository.findOne({ where: { id: id } });
        if (!periodoLectivo) {
            throw new NotFoundException({ message: 'No existe el periodo' });
        }
        return periodoLectivo;


    }
    async findByNombre(nombrePeriodoLectivo: string): Promise<PeriodoLectivoEntity> {
        const lista = await this.periodoLectivoRepository.findOne({ where: { nombrePeriodoLectivo: nombrePeriodoLectivo } });
        return lista;
      }

    async create(dto: PeriodoLectivoDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombrePeriodoLectivo);
        if (exists) throw new BadRequestException(new MessageDto('Ese periodo lectivo ya existe'))
        const periodo = this.periodoLectivoRepository.create(dto);
        await this.periodoLectivoRepository.save(periodo);
        return new MessageDto(`Periodo ${periodo.nombrePeriodoLectivo} creado`);
      }

    async update (id:number, dto: PeriodoLectivoDto): Promise<any>{
        const periodoLectivo = await this.findById(id);
        if(!periodoLectivo)
        throw new BadRequestException({message: 'Este periodo lectivo no existe'})
        dto.nombrePeriodoLectivo ? periodoLectivo.nombrePeriodoLectivo = dto.nombrePeriodoLectivo :  periodoLectivo.nombrePeriodoLectivo = periodoLectivo.nombrePeriodoLectivo;
        await this.periodoLectivoRepository.save(periodoLectivo);
        return {message: `Periodo lectivo ${periodoLectivo.nombrePeriodoLectivo} actualizado` };

    }
    async delete (id:number): Promise<any>{
        const periodoLectivo = await this.findById(id);
        await this.periodoLectivoRepository.remove(periodoLectivo);
        return{message: `Periodo lectivo ${periodoLectivo.nombrePeriodoLectivo} eliminado` }
    }
}