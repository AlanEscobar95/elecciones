import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PeriodoLectivoService } from './periodo-lectivo.service';
import { PeriodoLectivoDto } from './dto/periodo-lectivo.dto';

@Controller('periodoLectivo')
export class PeriodoLectivoController {

    constructor(
        private readonly periodoLectivoService: PeriodoLectivoService
    ){}

    @Get()
    async getAll(){
    return await this.periodoLectivoService.getAll(); 
    }
    
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
        return await this.periodoLectivoService.findById(id);
    }

    @Post()
    async create (@Body() dto: PeriodoLectivoDto){
        return await this.periodoLectivoService.create(dto);
    }

    @Put(':id')
    async update (@Param('id', ParseIntPipe) id: number, @Body() dto:PeriodoLectivoDto){
        return await this.periodoLectivoService.update(id,dto);
    } 

    @Delete('id')
    async delete (@Param('id',ParseIntPipe) id:number){
        return await this.periodoLectivoService.delete(id);
    }
}