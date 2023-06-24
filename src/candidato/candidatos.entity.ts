import { ListasEntity } from 'src/listas/listas.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('candidatos')
export class CandidatosEntity {
  /* Metodos */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del candidato',
    })
    createdAt: Date;
  
  @UpdateDateColumn({
    name: 'updated_at', // Nombre de la columna en la base de datos
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de los candidatos',
  })
  updatedAt: Date;

  @DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha en la que se elimina el candidato',
    })
    deleteAt: Date;
  /* Fin Metodos */

  /* Declaracion de campos de la tabla */
  @PrimaryGeneratedColumn()
  id: number;

  /* Campo Nombre del Candidato */
  @Column({
    name: 'nombre_candidato',
    type: 'varchar',
    comment: 'Nombre del Candidato a postularse',
  })
  nombre: string;

  /* Campo Apellido del Candidato */
  @Column({
    name: 'apellido_candidato',
    type: 'varchar',
    length: 50,
    comment: 'Apellido del candidato a postularse',
  })
  apellido: string;

  /* Campo carrera del Candidato */
  @Column({
    name: 'carrera_id',
    type: 'int',
    comment: 'Carrera que se encuentra cursando el candidato de lista',
  })
  carreraId: string;

  @ManyToOne(() => ListasEntity, lista => lista.candidatos)
  @JoinColumn({ name: 'lista_id' })
  lista: ListasEntity;
}