import { IsEmail, MaxLength} from "class-validator";
import { IsNotBlank } from "src/cronograma/decorators/is-not-blank.decorator";

export class LoginUsuarioDto{
   
   @MaxLength(50,{message:'El rol no puede tener mas de 50 caracteres'})
   nombreRol: string;
   
   @IsEmail()
   correo_electronico: string;

   @IsNotBlank({message:'La contraseña no puede estar vacia'})
   password: string;
}