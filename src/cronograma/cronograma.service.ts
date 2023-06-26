import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronogramasEntity } from './cronograma.entity';
import { CronogramaDto } from './dto/cronograma-dto';
import { CronogramaRepository } from './cronograma.repository';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from 'src/rol/rol.enum';
import { RolDecorator } from './decorators/rol.decorador';

@Injectable()
export class CronogramaService {

  constructor(
    @InjectRepository(CronogramasEntity)
    private cronogramaRepository: CronogramaRepository
  ) {}
  
  @RolDecorator(RolNombre.ADMINISTRADOR)
  async getall(): Promise<CronogramasEntity[]> {
    const list = await this.cronogramaRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('La Lista esta vacia' ));
    }
    return list;
  }
 
  @RolDecorator(RolNombre.ADMINISTRADOR)
  async findById(id: number): Promise<CronogramasEntity> {
    const cronograma = await this.cronogramaRepository.findOne({where:{id:id}});
    if (!cronograma) {
      throw new NotFoundException(new MessageDto('No existe una tarea con ese id'));
    }
    return cronograma;
  }
  
  @RolDecorator(RolNombre.ADMINISTRADOR)
  async findByNombre(nomTarea: string): Promise<CronogramasEntity> {
    const cronograma = await this.cronogramaRepository.findOne({ where: { nomTarea: nomTarea } });
    return cronograma;
  }
  
  @RolDecorator(RolNombre.ADMINISTRADOR)
  async create(dto: CronogramaDto): Promise<any> {
    const exists = await this.findByNombre(dto.nomTarea);
    if (exists) throw new BadRequestException(new MessageDto ('Esta tarea ya existe'))
    const cronograma = this.cronogramaRepository.create(dto);
    await this.cronogramaRepository.save(cronograma);
    return new MessageDto (`Tarea ${cronograma.nomTarea} creada` );
  } 

  @RolDecorator(RolNombre.ADMINISTRADOR)
  async update(id: number, dto: CronogramaDto): Promise<any> {
    const cronograma = await this.findById(id);
    if(!cronograma)
    throw new BadRequestException(new MessageDto ('Esa tarea no existe'));
    const exists = await this.findByNombre(dto.nomTarea);
    if (exists && exists.id !==id) throw new BadRequestException(new MessageDto ('Esa tarea ya existe'));
    dto.nomTarea ? cronograma.nomTarea = dto.nomTarea : cronograma.nomTarea = cronograma.nomTarea;
    dto.encargado ? cronograma.encargado = dto.encargado : cronograma.encargado = cronograma.encargado;
    dto.fechaIni ? cronograma.fechaIni = dto.fechaIni : cronograma.fechaIni = cronograma.fechaIni;
    dto.fechaFin ? cronograma.fechaFin = dto.fechaFin: cronograma.fechaFin = cronograma.fechaFin;
    await this.cronogramaRepository.save(cronograma);
    return new MessageDto (`Tarea ${cronograma.nomTarea} actualizada` );
  }
  
  @RolDecorator(RolNombre.ADMINISTRADOR)
  async delete(id: number): Promise<any> {
    const cronograma = await this.findById(id);
    await this.cronogramaRepository.delete(cronograma);
    return new MessageDto (`Tarea ${cronograma.nomTarea} eliminada` );
  }
}

