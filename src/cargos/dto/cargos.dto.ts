import { IsNotBlank } from "decorators/is-not-blank.decorator";

export class CargosDto{

    @IsNotBlank({message: 'El nombre de la tarea no puede estar vacio'})
    nombreCargo?: string;
}





