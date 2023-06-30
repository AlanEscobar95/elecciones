import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CargosDto } from './dto/cargos.dto';


@Controller('cargos')
export class CargosController {

    constructor(
        private readonly cargosService: CargosService
    ){}

    @Get()
    async getall(){
        return await this.cargosService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.cargosService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: CargosDto){
        return await this.cargosService.create(dto);
    }

    @Put(':id')
    async update(@Param('id',ParseIntPipe) id: number, @Body() dto:CargosDto){
        return await this.cargosService.update(id,dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.cargosService.delete(id);
    }
}
