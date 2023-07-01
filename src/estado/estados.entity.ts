import { CronogramasEntity } from 'src/cronograma/cronograma.entity';
import { ListasEntity } from 'src/listas/listas.entity';
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('estados')
  export class EstadosEntity {
    /* Definicion de campos de la tabla */
    @PrimaryGeneratedColumn() 
    id: number;
  
  
    /*Campo Nombre del Estado*/
    @Column({
        name: 'nombre_estado',
        type: 'varchar',
        comment: 'Nombre del Estado'
      })
      nombreEstado: string;

    @OneToMany(()=> UsuariosEntity, usuarios => usuarios.estados)
    usuarios: UsuariosEntity;

    @OneToMany(()=> ListasEntity, listas => listas.estados)
    listas: ListasEntity;

    @OneToMany(()=> CronogramasEntity, cronogramas => cronogramas.estados)
    cronogramas:  CronogramasEntity;
  }