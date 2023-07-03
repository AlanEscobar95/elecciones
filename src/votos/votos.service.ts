import { Injectable, NotFoundException } from '@nestjs/common';
import { VotosDto } from './dto/votos.dto';
import { VotosEntity } from './votos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VotosRepository } from './votos.repository';
import { ListasEntity } from 'src/listas/listas.entity';
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import { ListasRepository } from 'src/listas/listas.repository';
import { UsuarioRepository } from 'src/usuario/usuario.repository';


@Injectable()
export class VotosService {
    constructor(
        @InjectRepository(VotosEntity)
        private votosRepository: VotosRepository,
        @InjectRepository(ListasEntity)
        private listasRepository: ListasRepository,
        @InjectRepository(UsuariosEntity)
        private usuariosRepository: UsuarioRepository
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
    
      async create(dto: VotosDto): Promise<any> {
        const nuevoVoto = new VotosEntity();
        nuevoVoto.fechaVoto = dto.fechaVoto;
      
        // Obtén las instancias de ListasEntity y UsuariosEntity utilizando los IDs proporcionados
        const lista = await this.listasRepository.findOne({ where: { id: dto.idLista } });
        const usuario = await this.usuariosRepository.findOne({ where: { id: dto.idUsuario } });
      
        if (!lista || !usuario) {
          throw new NotFoundException('No se encontró la lista o el usuario');
        }
      
        nuevoVoto.lista = lista;
        nuevoVoto.usuario = usuario;
      
        await this.votosRepository.save(nuevoVoto);
        return nuevoVoto;
      }
      
      
}
