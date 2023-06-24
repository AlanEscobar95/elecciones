/*==================LISTAS-ENTITY==============*/
import { CandidatosEntity } from 'src/candidato/candidatos.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  
  @Entity('listas')
  export class ListasEntity {
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
  
  
    /*Campo Nombre de la lista*/
    @Column({
        name: 'nombre_lista',
        type: 'varchar',
        comment: 'Nombre de la lista Ejm: YaviSchool',
      })
      nombreLista: string;

    /*Campo Slogan de la Lista*/
    @Column({
        name: 'slogan',
        type: 'varchar',
        comment: 'Slogan de la Lista',
      })
      slogan: string;
      
     /*Campo Propuestas*/
     @Column({
      name: 'propuestas',
      type: 'varchar',
      comment: 'Indicar las propuestas Ejm: Tener mas practicas, mejores instrumentos  ',
    })
    propuestas: string;
    
    /*Campo Color de la Lista*/
      @Column({
        name: 'color',
        type: 'varchar',
        comment: 'Color de la Lista Ej:Verde',
      })
      color: string;
    
    /*Campo Número de la Lista*/
    @Column({
        name: 'numero_lista',
        type: 'integer',
        comment: 'Color de la Lista Ej:Verde',
      })
      numeroLista: number;
      
      /*Campo de la imagen de la Lista*/
    @Column({
        name: 'imagen',
        type: 'varchar',
        comment: 'Imagen de la lista',
      })
      imagenLogo: string;

      @OneToMany(() => CandidatosEntity, candidato => candidato.lista)
      candidatos: CandidatosEntity[];
  }
  