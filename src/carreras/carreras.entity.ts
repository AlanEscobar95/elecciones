import { UsuariosEntity } from "src/usuario/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('carreras')

export class CarrerasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    name:'nombre_carrera',
    type: 'varchar', 
    length: 50,
    comment:'Ejm: Desarrollo de Software'
  })
   nombreCarrera: string;

  @OneToMany(() => UsuariosEntity, usuario => usuario.carrera)
  usuarios: UsuariosEntity[]

}