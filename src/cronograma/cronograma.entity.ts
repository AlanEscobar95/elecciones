import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cronogramas'})

export class CronogramasEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length:50})
    nomTarea: string;
    @Column({type: 'varchar', length:50})
    encargado: string;
    @Column({type: 'date'})
    fechaIni: Date;
    @Column({type: 'date'})
    fechaFin: Date;
}

