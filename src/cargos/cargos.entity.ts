/*==================CARGO-ENTITY==============*/
import { UsuariosEntity } from 'src/usuario/usuario.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cargos')
export class CargosEntity {


  /* Declaracion de campos de la tabla */
  @PrimaryGeneratedColumn()
  id: number;

  /*Campo Nombre del Cargo*/

  @Column({
    name: 'nombre_cargo',
    type: 'varchar',
    comment: 'Nombre del Cargo',
  })
  nombreCargo: string;


  @OneToMany(() => UsuariosEntity, usuario => usuario.cargos)
  usuarios: UsuariosEntity[]

}
