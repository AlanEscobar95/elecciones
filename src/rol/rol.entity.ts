import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolNombre } from "./rol.enum";
import { UsuariosEntity } from "src/usuario/usuario.entity";

@Entity({name:'roles'})
export class RolesEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:'varchar', nullable: false, unique: true})
    rolNombre: RolNombre;
    
    @ManyToMany(type => UsuariosEntity, usuario => usuario.roles)
    usuarios:UsuariosEntity[];
}