import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoListasRepository } from './tipo-listas.repository';
import { TipoListasEntity } from './tipo-listas.entity';
import { TipoListasDto } from './dto/tipo-listas.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoListasService {
  constructor(
    @InjectRepository(TipoListasEntity)
    private readonly tipolistasRepository: TipoListasRepository,
  ) {}

  async getAll(): Promise <TipoListasEntity[]>{
   const tipoListas = await this.tipolistasRepository.find();
   if(!tipoListas.length){
     throw new NotFoundException({message:'No hay ningún tipo de lista'});
   }
   return tipoListas;
  }

  async findById(id: number): Promise <TipoListasEntity>{
    const tipoLista = await this.tipolistasRepository.findOne({where:{id:id}});
    if(!tipoLista){
      throw new NotFoundException({message:'No existe el tipo de lista'});
    }
    return tipoLista;
  }
  
  async findByNombre(nombreTipoLista: string): Promise <TipoListasEntity>{
    const tipoLista = await this.tipolistasRepository.findOne({where:{nombreTipoLista:nombreTipoLista}});
    return tipoLista;
  }

  async create(dto:TipoListasDto): Promise <any>{
   const tipoLista = this.tipolistasRepository.create(dto);
   await this.tipolistasRepository.save(tipoLista);
   return {message: `Tipo de lista ${tipoLista.nombreTipoLista} creado`}
   }

  async update(id:number,dto:TipoListasDto): Promise <any>{
   const tipoLista = await this.findById(id);
   if(!tipoLista)
   throw new NotFoundException({message:'No existe el tipo de lista'});
    dto.nombreTipoLista ? tipoLista.nombreTipoLista = dto.nombreTipoLista:tipoLista.nombreTipoLista = tipoLista.nombreTipoLista;
    await this.tipolistasRepository.save(tipoLista);
    return {message:`Tipo de lista ${tipoLista.nombreTipoLista} actualizado`}
  }

  async delete(id:number): Promise <any>{
    const tipoLista = await this.findById(id);
    await this.tipolistasRepository.remove(tipoLista);
    return {message:`Tipo de lista ${tipoLista.nombreTipoLista} eliminado`}
  }
}
