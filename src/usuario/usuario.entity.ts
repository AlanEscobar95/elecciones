import { hash } from "bcryptjs";
import { RolesEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuarios'})
export class UsuariosEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:'varchar', nullable: false})
    nombre: string; 
    
    @Column({type:'varchar', nullable: false})
    nombreRol: string;

    @Column({type:'varchar', nullable: false})
    apellido: string;

    @Column({type:'varchar', nullable: false})
    carrera: string;

    @Column({type:'varchar', nullable: false})
    jornada: string;

    @Column({type:'varchar', nullable: false})
    correo_electronico: string;

    @Column({type:'varchar', nullable: false})
    password: string;

    @Column({type:'boolean', nullable: true})
    estado_usuario: boolean;

    @Column({type:'boolean', nullable: true})
    estado_voto: boolean;
    
    @ManyToMany(type => RolesEntity, rol => rol.usuarios,{eager:true})
    @JoinTable({
        name:'usuarios_roles',
        joinColumn:{name:'usuario_id'},
        inverseJoinColumn:{name:'rol_id'}
    })
    roles:RolesEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.password) return;
        this.password = await hash(this.password, 16);
    }
}