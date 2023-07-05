import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TareasEntity } from './tareas.entity';
import { TareasRepository } from './tareas.repository';
import { TareasDto } from './dto/tareas.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class TareasService {
    constructor(
        @InjectRepository(TareasEntity)
        private tareasRepository: TareasRepository
    ) { }

    async getAll(): Promise<TareasEntity[]> {
        const tareas = await this.tareasRepository.find();
        if (!tareas.length) {
            throw new NotFoundException({ message: 'No hay ninguna tarea' })
        }
        return tareas;
    }

    async findById(id: number): Promise<TareasEntity> {
        const tarea = await this.tareasRepository.findOne({ where: { id: id } });
        if (!tarea) {
            throw new NotFoundException({ message: 'No existe la tarea' });
        }
        return tarea;
    }

    async findByNombre(nombreTarea: string): Promise<TareasEntity> {
        const tarea = await this.tareasRepository.findOne({ where: { nombreTarea: nombreTarea } });
        return tarea;
    }

    async create(dto: TareasDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombreTarea);
        if (exists) throw new BadRequestException(new MessageDto('Esta tarea ya existe'))
        const lista = this.tareasRepository.create(dto);
        await this.tareasRepository.save(lista);
        return new MessageDto(`Tarea ${lista.nombreTarea} creada`);
    }

    async update(id: number, dto: TareasDto): Promise<any> {
        const tarea = await this.findById(id);
        if (!tarea)
            throw new BadRequestException({ message: 'No existe la tarea' });
        dto.nombreTarea ? tarea.nombreTarea = dto.nombreTarea : tarea.nombreTarea = tarea.nombreTarea;
        dto.descripcion ? tarea.descripcion = dto.descripcion : tarea.descripcion = tarea.descripcion;
        dto.encargado ? tarea.encargado = dto.encargado : tarea.encargado = tarea.encargado;
        dto.fechaInicio ? tarea.fechaInicio = dto.fechaInicio : tarea.fechaInicio = tarea.fechaInicio;
        dto.fechaFinalizacion ? tarea.fechaFinalizacion = dto.fechaFinalizacion : tarea.fechaFinalizacion = tarea.fechaFinalizacion;
        await this.tareasRepository.save(tarea);
        return { message: `Tarea ${tarea.nombreTarea} actualizada` }
    }
    async delete(id: number): Promise<any> {
        const tarea = await this.findById(id);
        await this.tareasRepository.remove(tarea);
        return { message: `Tarea ${tarea.nombreTarea} eliminada` }
    }

}


