import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly usuarioRepository: UsuarioRepository,
   private readonly usuarioService:UsuarioService) {}
   
  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto): Promise<void> {
    const { correo_electronico } = requestResetPasswordDto;
    const token = randomBytes(32).toString('hex');
    const usuario = await this.usuarioService.findByCorreo(correo_electronico);
    usuario.resetPasswordToken = token;
    await this.usuarioRepository.save(usuario);
    this.sendResetPasswordEmail(correo_electronico, token);
  }

  private async sendResetPasswordEmail(correo_electronico: string, token: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        // Configuración del transporte de correo electrónico (SMTP, etc.)
        // Por ejemplo, si utilizas un servicio de correo como Gmail:
        service: 'Gmail',
        auth: {
          user: 'arp.escobar@yavirac.edu.ec',
          pass: 'tuaezfqobvknlizsbd',
        },
      });
  
      const message = {
        from: 'arp.escobar.@yavirac.edu.ec',
        to: correo_electronico,
        subject: 'Restablecimiento de contraseña',
        text: `¡Hola!\n\nSe ha solicitado un restablecimiento de contraseña para tu cuenta. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${token}`,
      };
  
      const info = await transporter.sendMail(message);
      console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
    }
  }
}

