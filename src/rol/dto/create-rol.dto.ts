import { IsEnum } from "class-validator";
import { RolNombre } from "../rol.enum";

export class CreateRolDto {
    @IsEnum(RolNombre, {message: 'Los roles permitidos son: administrador, votante, candidato'})
    rolNombre: RolNombre;
}