import { ListasEntity } from 'src/listas/listas.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('tipos_listas')
  export class TipoListasEntity {

    /*Declaracion de campos de la tabla*/
    @PrimaryGeneratedColumn() /*('uuid') Permite crear un id alfanúmerico*/ 
    id: number;
  
    /*Campo Nombre de los tipos de Listas*/
    @Column({
        name: 'nombre_tipo_lista',
        type: 'varchar',
        comment: 'Nombre de los tipos de Listas',
      })
      nombreTipoLista: string;

      @OneToMany(() => ListasEntity, lista => lista.tipoListas)
      listas: ListasEntity[];

  }