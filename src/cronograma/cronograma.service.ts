import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronogramaEntity } from './cronograma.entity';
import { CronogramaDto } from './dto/cronograma-dto';
import { CronogramaRepository } from './cronograma.repository';
import { FindOneOptions } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class CronogramaService {
  constructor(
    @InjectRepository(CronogramaEntity)
    private cronogramaRepository: CronogramaRepository
  ) {}

  async getall(): Promise<CronogramaEntity[]> {
    const list = await this.cronogramaRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('La Lista esta vacia' ));
    }
    return list;
  }

  async findById(id: number): Promise<CronogramaEntity> {
    const cronograma = await this.cronogramaRepository.findOne({where:{id:id}});
    if (!cronograma) {
      throw new NotFoundException(new MessageDto('No existe una tarea con ese id'));
    }
    return cronograma;
  }

  async findByNombre(nomTarea: string): Promise<CronogramaEntity> {
    const cronograma = await this.cronogramaRepository.findOne({ where: { nomTarea: nomTarea } });
    return cronograma;
  }

  async create(dto: CronogramaDto): Promise<any> {
    const exists = await this.findByNombre(dto.nomTarea);
    if (exists) throw new BadRequestException(new MessageDto ('Esta tarea ya existe'))
    const cronograma = this.cronogramaRepository.create(dto);
    await this.cronogramaRepository.save(cronograma);
    return new MessageDto (`Tarea ${cronograma.nomTarea} creada` );
  } 

  async update(id: number, dto: CronogramaDto): Promise<any> {
    const cronograma = await this.findById(id);
    if(!cronograma)
    throw new BadRequestException({ message: 'Esa tarea no existe'});
    const exists = await this.findByNombre(dto.nomTarea);
    if (exists && exists.id !==id) throw new BadRequestException(new MessageDto ('Esa tarea ya existe'));
    cronograma.nomTarea = dto.nomTarea ?? cronograma.nomTarea;
    cronograma.encargado = dto.encargado ?? cronograma.encargado;
    cronograma.fechaIni = dto.fechaIni ?? cronograma.fechaIni;
    cronograma.fechaFin = dto.fechaFin ?? cronograma.fechaFin;
    await this.cronogramaRepository.save(cronograma);
    return new MessageDto (`Tarea ${cronograma.nomTarea} actualizada` );
  }

  async delete(id: number): Promise<any> {
    const cronograma = await this.findById(id);
    await this.cronogramaRepository.delete(cronograma);
    return new MessageDto (`Tarea ${cronograma.nomTarea} eliminada` );
  }
}

