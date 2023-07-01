import { ListasEntity } from "src/listas/listas.entity";
import { UsuariosEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('votos')
export class VotosEntity {
    /*Declaracion de los campos de la tabla*/
    @PrimaryGeneratedColumn()
    id: number;
  
    /*Fecha y hora Voto */
    @Column({
      name: 'fecha_voto',
      type: 'date',
      comment: 'fecha y hora del voto',
    })
    fechaVoto: Date;

  @ManyToOne(() => ListasEntity, lista => lista.votos)
  @JoinColumn({ name: 'lista_id' })
  lista: ListasEntity;

  @ManyToOne(() => UsuariosEntity, usuario => usuario.votos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuariosEntity;
    
  }