import { Controller, Get, Param, Put, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasDto } from './dto/tareas.dto';

@Controller('tareas')
export class TareasController {
    constructor(
        private readonly tareasService: TareasService
    ) { }

    @Get()
    async getAll() {
        return await this.tareasService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return await this.tareasService.findById(id);
    }


    @Post()
    async create(@Body() dto: TareasDto) {
        return await this.tareasService.create(dto);
    }
     
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: TareasDto) {
      return await this.tareasService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.tareasService.delete(id);
    }
}
