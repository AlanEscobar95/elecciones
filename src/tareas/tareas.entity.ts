import { CronogramasEntity } from 'src/cronograma/cronograma.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('tareas')
export class TareasEntity {
  /* Declaracion de campos de la tabla */
  @PrimaryGeneratedColumn()
  id: number;

  /*Campo Nombre del Tarea*/
  @Column({
    name: 'nombre_tarea',
    type: 'varchar',
    comment: 'Nombre de la Tarea',
  })
  nombreTarea: string;


  /*Campo Descripcion*/
  @Column({
    name: 'descripcion_tarea',
    type: 'varchar',
    comment: 'De que va a tratar la tarea',
  })
  descripcion: string;

  @Column({
    name: 'encargado',
    type: 'varchar',
    comment: 'Encargado de realizar la tarea'
  })
  encargado: string;

  @Column({
     name:'fecha_inicio',
     type: 'date',
     comment: 'Fecha en la que comienza la tarea'
    })
  fechaInicio: Date;
   
  @Column({ 
    name:'fecha_finalizacion',
    type: 'date',
    comment: 'Fecha en la que finaliza la tarea'
  })
  fechaFinalizacion: Date;

  @ManyToOne(() => CronogramasEntity, cronograma => cronograma.tareas)
    cronogramaId: CronogramasEntity;

}