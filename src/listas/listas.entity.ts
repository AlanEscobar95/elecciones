import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstadosEntity } from 'src/estado/estados.entity';
import { PeriodoLectivoEntity } from 'src/periodo-lectivo/periodo-lectivo.entity';
import { TipoListasEntity } from 'src/tipo-listas/tipo-listas.entity';
import { VotosEntity } from 'src/votos/votos.entity';



@Entity('listas')
export class ListasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_lista', type: 'varchar', comment: 'Nombre de la lista Ejm: YaviSchool' })
  nombreLista: string;

  @Column({ name: 'slogan', type: 'varchar', comment: 'Slogan de la Lista' })
  slogan: string;

  @Column({ name: 'propuestas', type: 'varchar', comment: 'Indicar las propuestas Ejm: Tener mas practicas, mejores instrumentos' })
  propuestas: string;

  @Column({ name: 'color', type: 'varchar', comment: 'Color de la Lista Ej:Verde' })
  color: string;

  @Column({ name: 'numero_lista', type: 'integer', comment: 'Numero de la Lista Ej: 1' })
  numeroLista: number;

  @Column({ name: 'imagen', type: 'varchar', comment: 'Imagen de la lista' })
  imagenLogo: string;

  @OneToMany(() => VotosEntity, voto => voto.lista)
  votos: VotosEntity[];
  
  @ManyToOne(() => PeriodoLectivoEntity, periodoLectivo => periodoLectivo.listas)
  @JoinColumn({ name: 'periodoLectivo_id' })
  periodoLectivo: PeriodoLectivoEntity;

  @ManyToOne(() => TipoListasEntity, tipoListas => tipoListas.listas)
  @JoinColumn({ name: 'tipo_lista_id' })
  tipoListas: TipoListasEntity;

  @ManyToOne(() => EstadosEntity, estados => estados.listas)
  @JoinColumn({ name: 'estados_id' })
  estados: EstadosEntity;
}
