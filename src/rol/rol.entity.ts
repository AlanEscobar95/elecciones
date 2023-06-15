import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolNombre } from "./rol.enum";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Entity({name:'roles'})
export class RolEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:'varchar', nullable: false, unique: true})
    rol_nombre: RolNombre; 
    
    @ManyToMany(type => UsuarioEntity, usuario => usuario.roles)
    usuarios:UsuarioEntity[];
}