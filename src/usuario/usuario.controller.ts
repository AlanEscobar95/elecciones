import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    @Get()
    getAll() {
        return this.usuarioService.getAll();
    }

    @Get(':id')
    async getOne(@Param ('id', ParseIntPipe) id: number) {
        return await this.usuarioService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    create(@Body()dto: CreateUsuarioDto){
        return this.usuarioService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:CreateUsuarioDto){
        return await this.usuarioService.update(id,dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return await this.usuarioService.delete(id)
    }

}