import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosDto } from './dto/estadosDto';

@Controller('estados')
export class EstadosController {
    constructor(private readonly estadosService:EstadosService){}


    @Get()
    async getAll(){
        return await this.estadosService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
        return await this.estadosService.findById(id)
    }

    @Post()
    async create(@Body() dto: EstadosDto){
        return await this.estadosService.create(dto);
    }


    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:EstadosDto){
        return await this.estadosService.update(id,dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return await this.estadosService.delete(id)
    }
    
}
