import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TipoListasService } from './tipo-listas.service';
import { TipoListasDto } from './dto/tipo-listas.dto';

@Controller('tipo-listas')
export class TipoListasController {
  constructor(
    private readonly tipoListasService: TipoListasService
  ){}

  @Get()
    async getAll(){
        return await this.tipoListasService.getAll();
    }
  
  @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){  
        return await this.tipoListasService.findById(id);
    }
  
  @Post()
    async create(@Body() dto: TipoListasDto){
        return await this.tipoListasService.create(dto);
    }
  
  @Put(':id')
   async update(@Param('id', ParseIntPipe) id: number, @Body() dto: TipoListasDto){
    return await this.tipoListasService.update(id, dto);
   }
  
  @Delete(':id')
   async delete(@Param('id', ParseIntPipe) id: number){
    return await this.tipoListasService.delete(id);
   }
}
