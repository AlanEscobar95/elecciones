import { ListasEntity } from "src/listas/listas.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('periodoLectivo')
export class PeriodoLectivoEntity{
@PrimaryGeneratedColumn()
id:number;

@Column({ 
    name: 'nombre_periodo_lectivo',
    type: 'varchar',
    comment: 'Nombre del periodo lectivo Eem: Periodo lectivo 2019/2020'
})

nombrePeriodoLectivo: string;

@OneToMany(()  => ListasEntity, lista => lista.periodoLectivo)
    listas: ListasEntity[];
}