import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasDto } from './dto/carreras.dto';

@Controller('carreras')
export class CarrerasController {
    constructor(
        private readonly carrerasService: CarrerasService
    ) { }

    @Get()
    async getall() {
        return await this.carrerasService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.carrerasService.findById(id);
    }

    @Post()
    async create(@Body() dto:CarrerasDto){
        return await this.carrerasService.create(dto);
    }
        
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto:CarrerasDto){
        return await this.carrerasService.update(id, dto);
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
      return await this.carrerasService.delete(id);  
    }
}
