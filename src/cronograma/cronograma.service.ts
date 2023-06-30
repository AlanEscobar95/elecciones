import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronogramasEntity } from './cronograma.entity';
import { CronogramaDto } from './dto/cronograma-dto';
import { CronogramaRepository } from './cronograma.repository';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from 'src/rol/rol.enum';
import { RolDecorator } from 'decorators/rol.decorador';


@Injectable()
export class CronogramaService {

  constructor(
    @InjectRepository(CronogramasEntity)
    private cronogramaRepository: CronogramaRepository
  ) {}
  
  
  async getall(): Promise<CronogramasEntity[]> {
    const list = await this.cronogramaRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('La Lista esta vacia' ));
    }
    return list;
  }
 
  
  async findById(id: number): Promise<CronogramasEntity> {
    const cronograma = await this.cronogramaRepository.findOne({where:{id:id}});
    if (!cronograma) {
      throw new NotFoundException(new MessageDto('No existe una tarea con ese id'));
    }
    return cronograma;
  }
  
  
  async findByNombre(nombreCronograma: string): Promise<CronogramasEntity> {
    const cronograma = await this.cronogramaRepository.findOne({ where: { nombreCronograma: nombreCronograma } });
    return cronograma;
  }
  
  //@RolDecorator(RolNombre.ADMINISTRADOR)
  async create(dto: CronogramaDto): Promise<any> {
    const exists = await this.findByNombre(dto.nombreCronograma);
    if (exists) throw new BadRequestException(new MessageDto ('Esta tarea ya existe'))
    const cronograma = this.cronogramaRepository.create(dto);
    await this.cronogramaRepository.save(cronograma);
    return new MessageDto (`Tarea ${cronograma.nombreCronograma} creada` );
  } 


  async update(id: number, dto: CronogramaDto): Promise<any> {
    const cronograma = await this.findById(id);
    if(!cronograma)
    throw new BadRequestException(new MessageDto ('Esa tarea no existe'));
    dto.nombreCronograma ? cronograma.nombreCronograma = dto.nombreCronograma : cronograma.nombreCronograma = cronograma.nombreCronograma;
    const exists = await this.findByNombre(dto.nombreCronograma);
    if (exists && exists.id !==id) throw new BadRequestException(new MessageDto ('Esa tarea ya existe'));
    await this.cronogramaRepository.save(cronograma);
    return new MessageDto (`Tarea ${cronograma.nombreCronograma} actualizada` );
  }
  
  async delete(id: number): Promise<any> {
    const cronograma = await this.findById(id);
    await this.cronogramaRepository.remove(cronograma);
    return new MessageDto (`Tarea ${cronograma.nombreCronograma} eliminada` );
  }
}

