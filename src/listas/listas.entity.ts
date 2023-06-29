/*==================LISTAS-ENTITY==============*/
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
  @Entity('listas')
  export class ListasEntity {
   
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
        comment: 'Numero de la Lista Ej: 1',
      })
      numeroLista: number;
      
      /*Campo de la imagen de la Lista*/
    @Column({
        name: 'imagen',
        type: 'varchar',
        comment: 'Imagen de la lista',
      })
      imagenLogo: string;

      @OneToMany(() => UsuariosEntity, usuarios => usuarios.lista)
      usuarios: UsuariosEntity[];
      
    nomTarea: any;
  }
  