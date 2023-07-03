import { Body, Controller, Get, UsePipes, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Get()
    getAll() {
        return this.authService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('nuevo')
    create(@Body()dto: NuevoUsuarioDto){
        return this.authService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('nuevo/votante')
    createVotante(@Body()dto: NuevoUsuarioDto){
        return this.authService.createVotante(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('login')
    login(@Body()dto: LoginUsuarioDto){
        return this.authService.login(dto);
    }
}
