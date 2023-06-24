import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('periodos_lectivos')
  export class PeriodoLectivoEntity {
     /*Metodos*/
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
    /*Fin de Metodos*/

    /*Declaracion de los campos de la tabla*/
    @PrimaryGeneratedColumn()
    id: number;
  
    /*Campo Nombre del periodo lectivo*/
    @Column({
        name: 'nombre_periodo',
        type: 'varchar',
        comment: 'Nombre del periodo lectivo',
      })
      nombrePeriodo: string;
    
    /*Campo fecha de emisión del periodo lectivo*/
    @Column({
        name: 'fecha_periodo',
        type: 'date',
        comment: 'Nombre del periodo lectivo',
      })
      fechaEmision: Date;
    
    /*Campo Fecha de finalización del periodo lectivo*/
    @Column({
        name: 'fecha_finalizacion',
        type: 'date',
        comment: 'Nombre del periodo lectivo',
      })
      fechaFinalizacion: Date;
      
  }