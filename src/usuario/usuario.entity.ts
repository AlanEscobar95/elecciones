import { hash } from "bcryptjs";
import { ListasEntity } from "src/listas/listas.entity";
import { RolesEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => ListasEntity, lista => lista.usuarios)
    @JoinColumn({ name: 'lista_id' })
    lista: ListasEntity;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.password) return;
        this.password = await hash(this.password, 16);
    }
}