import { hash } from "bcryptjs";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuarios'})
export class UsuarioEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:'varchar', nullable: false})
    nombre: string; 
    
    @Column({type:'varchar', nullable: false})
    nombreUsuario: string;

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

    @Column({type:'boolean', nullable: false})
    estado_usuario: boolean;

    @Column({type:'boolean', nullable: false})
    estado_voto: boolean;
    
    @ManyToMany(type => RolEntity, rol => rol.usuarios,{eager:true})
    @JoinTable({
        name:'usuarios_roles',
        joinColumn:{name:'usuario_id'},
        inverseJoinColumn:{name:'rol_id'}
    })
    roles:RolEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.password) return;
        this.password = await hash(this.password, 16);
    }
}