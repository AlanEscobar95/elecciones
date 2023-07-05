import { hash } from "bcryptjs";
import { CargosEntity } from "src/cargos/cargos.entity";
import { CarrerasEntity } from "src/carreras/carreras.entity";
import { EstadosEntity } from "src/estado/estados.entity";
import { RolesEntity } from "src/rol/rol.entity";
import { VotosEntity } from "src/votos/votos.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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
    
    
    @Column({type:'varchar', unique: true, name:'reset_password_token', nullable:true,})
    resetPasswordToken: string;
  
    @ManyToMany(type => RolesEntity, rol => rol.usuarios,{eager:true})
    @JoinTable({
        name:'usuarios_roles',
        joinColumn:{name:'usuario_id'},
        inverseJoinColumn:{name:'rol_id'}
    })
    roles:RolesEntity[];

    
    @ManyToOne(() => CarrerasEntity, carrera => carrera.usuarios)
    @JoinColumn({ name: 'carrera_id' })
    carreras: CarrerasEntity;

    @ManyToOne(() => EstadosEntity, estados => estados.usuarios)
    @JoinColumn({ name: 'estados_id' })
    estados: EstadosEntity;

    @ManyToOne(() => CargosEntity, cargo => cargo.usuarios)
    cargos: UsuariosEntity[]

    @OneToMany(() => VotosEntity, voto => voto.usuario)
    votos: VotosEntity[];


    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.password) return;
        this.password = await hash(this.password, 16);
    }
}