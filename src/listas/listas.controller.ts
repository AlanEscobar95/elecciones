import {Body,Controller,Get,Param,ParseIntPipe,Post,Put,Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { ListasDto } from './dto/listas.dto';
import { RolesGuard } from 'src/guards/rol.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ListasService } from './listas.service';

@Controller('listas')
export class ListasController {

    constructor(
       private readonly listasService: ListasService
    ){}
        
        @UseGuards(RolesGuard)
        @Get()
        async getall(){
          return await this.listasService.getall();
        }
        
        @Get(':id')
        async getOne(@Param('id', ParseIntPipe) id: number){
          return await this.listasService.findById(id);
        }

        
        @Post()
        async create(@Body() dto: ListasDto){
          return await this.listasService.create(dto);
        }
    
        @Put(':id')
        async update(@Param('id',ParseIntPipe) id: number, @Body() dto:ListasDto){
          return await this.listasService.update(id,dto);
        }

        @Delete(':id')
        async delete(@Param('id', ParseIntPipe) id:number){
            return await this.listasService.delete(id)
        }
}
