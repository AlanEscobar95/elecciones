import { IsEmail} from "class-validator";
import { IsNotBlank } from "src/cronograma/decorators/is-not-blank.decorator";

export class LoginUsuarioDto{
   
   /*@MaxLength(50,{message:'El nombre no puede tener mas de 50 caracteres'})
   nombreUsuario: string;*/

   @IsEmail()
   correo_electronico: string;

   @IsNotBlank({message:'La contraseña no puede estar vacia'})
   password: string;
}