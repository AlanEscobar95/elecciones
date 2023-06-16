import { IsBooleanString, IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/cronograma/decorators/is-not-blank.decorator";

export class NuevoUsuarioDto{
   
   @IsString()
   @IsNotBlank({message:'El nombre no puede estar vacio'})
   @MaxLength(50,{message:'El nombre no puede tener mas de 50 caracteres'})
   nombre: string;

   @MaxLength(50,{message:'El nombre no puede tener mas de 50 caracteres'})
   nombreUsuario: string;

   @IsString()
   @IsNotBlank({message:'El apellido no puede estar vacio'})
   @MaxLength(50,{message:'El apellido no puede tener mas de 50 caracteres'})
   apellido: string;

   @IsString()
   @IsNotBlank({message:'La carrera no puede estar vacia'})
   @MaxLength(50,{message:'El nombre no puede tener mas de 50 caracteres'})
   carrera: string;

   @IsString()
   @IsNotBlank({message:'La jornada no puede estar vacia'})
   @MaxLength(50,{message:'El nombre no puede tener mas de 50 caracteres'})
   jornada: string;

   @IsEmail()
   correo_electronico: string;

   @IsNotBlank({message:'La contraseña no puede estar vacia'})
   password: string;

   @IsBooleanString()
   estado_usuario: boolean;

   @IsBooleanString()
   estado_voto: boolean;
}