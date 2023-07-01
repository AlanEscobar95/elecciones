import { Injectable, NotFoundException } from '@nestjs/common';
import { VotosDto } from './dto/votos.dto';
import { VotosEntity } from './votos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VotosRepository } from './votos.repository';

@Injectable()
export class VotosService {
    constructor(
        @InjectRepository(VotosEntity)
        private votosRepository: VotosRepository,
      ) {}
    
      async getAll(): Promise<VotosEntity[]> {
        const votos = await this.votosRepository.find();
        if (!votos.length) {
          throw new NotFoundException('No existen votos');
        }
        return votos;
      }
    
      async findById(id: number): Promise<VotosEntity> {
        const voto = await this.votosRepository.findOne({ where: { id: id } });
        if (!voto) {
          throw new NotFoundException('No existe el voto');
        }
        return voto;
      }
    
      async create(dto:VotosDto): Promise<any> {
        const nuevoVoto = this.votosRepository.create(dto);
        await this.votosRepository.save(nuevoVoto);
        return nuevoVoto;
      }
}
