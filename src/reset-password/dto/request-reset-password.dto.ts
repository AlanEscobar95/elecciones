import { IsEmail, IsNotEmpty } from "class-validator";

export class RequestResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    correo_electronico: string;
}