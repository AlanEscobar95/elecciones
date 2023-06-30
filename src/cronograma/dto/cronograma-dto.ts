import { IsString,IsNotEmpty, IsDate, IsDateString } from "class-validator";
import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";

export class  CronogramaDto{

    @IsNotBlank({message: 'El nombre de la tarea no puede estar vacio'})
    nombreCronograma?: string;
}