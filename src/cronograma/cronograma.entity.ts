import { EstadosEntity } from "src/estado/estados.entity";
import { TareasEntity } from "src/tareas/tareas.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cronogramas'})

export class CronogramasEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length:50})
    nombreCronograma: string;
    
    @ManyToOne(() => EstadosEntity, estados => estados.cronogramas)
    @JoinColumn({ name: 'estados_id'})
    estados: EstadosEntity[];
    
    @OneToMany(() => TareasEntity, tarea => tarea.cronogramaId)
    tareas: TareasEntity[];
    
}

