import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from 'src/rol/rol.enum';
import { ListasEntity } from './listas.entity';
import { ListasRepository } from './listas.repository';
import { RolDecorator } from 'decorators/rol.decorador';
import { ListasDto } from './dto/listas.dto';


@Injectable()
export class ListasService {

  constructor(
    @InjectRepository(ListasEntity)
    private listasRepository: ListasRepository
  ) { }


  async getall(): Promise<ListasEntity[]> {
    const list = await this.listasRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('La Lista esta vacia'));
    }
    return list;
  }

  async findById(id: number): Promise<ListasEntity> {
    const lista = await this.listasRepository.findOne({ where: { id: id } });
    if (!lista) {
      throw new NotFoundException(new MessageDto('No existe una lista con ese id'));
    }
    return lista;
  }

  async findByNombre(nombreLista: string): Promise<ListasEntity> {
    const lista = await this.listasRepository.findOne({ where: { nombreLista: nombreLista } });
    return lista;
  }

  async create(dto: ListasDto): Promise<any> {
    const exists = await this.findByNombre(dto.nombreLista);
    if (exists) throw new BadRequestException(new MessageDto('Esta tarea ya existe'))
    const lista = this.listasRepository.create(dto);
    await this.listasRepository.save(lista);
    return new MessageDto(`Tarea ${lista.nombreLista} creada`);
  }

  async update(id: number, dto: ListasDto): Promise<any> {
    const lista = await this.findById(id);
    if (!lista)
      throw new BadRequestException(new MessageDto('Esa Lista no existe'));
    const exists = await this.findByNombre(dto.nombreLista);
    if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('Esa Lista ya existe'));
    dto.nombreLista ? lista.nombreLista = dto.nombreLista : lista.nombreLista = lista.nombreLista;
    dto.slogan ? lista.slogan = dto.slogan : lista.slogan = lista.slogan;
    dto.propuestas ? lista.propuestas = dto.propuestas : lista.propuestas = lista.propuestas;
    dto.color ? lista.color = dto.color : lista.color = lista.color;
    dto.numeroLista ? lista.numeroLista = dto.numeroLista : lista.numeroLista = lista.numeroLista;
    dto.imagenLogo ? lista.imagenLogo = dto.imagenLogo : lista.imagenLogo = lista.imagenLogo;
    await this.listasRepository.save(lista);
    return new MessageDto(`Lista ${lista.nombreLista} actualizada`);
  }



  async delete(id: number): Promise<any> {
    const listas = await this.findById(id);
    await this.listasRepository.remove(listas);
    return new MessageDto(`Tarea ${listas.nombreLista} eliminada`);
  }
}
