import {Body,Controller,Get,Param,ParseIntPipe,Post,Put,Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import {CronogramaDto} from './dto/cronograma-dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { CronogramaService } from './cronograma.service';
import { RolDecorator } from 'decorators/rol.decorador';
import { RolNombre } from 'src/rol/rol.enum';


@Controller('cronograma')
export class CronogramaController {
    constructor(private readonly cronogramaService: CronogramaService){}
        
        @UseGuards(JwtAuthGuard, RolesGuard)
        @Get()
        async getall(){
          return await this.cronogramaService.getall();
        }
        
        @UseGuards(JwtAuthGuard, RolesGuard)
        @Get(':id')
        async getOne(@Param('id', ParseIntPipe) id: number){
          return await this.cronogramaService.findById(id);
        }
        

        @UseGuards(JwtAuthGuard, RolesGuard)
        @Post()
        async create(@Body() dto: CronogramaDto){
          return await this.cronogramaService.create(dto);
        }
        
        @UseGuards(JwtAuthGuard, RolesGuard)
        @Put(':id')
        async update(@Param('id',ParseIntPipe) id: number, @Body() dto:CronogramaDto){
          return await this.cronogramaService.update(id,dto);
        }

        @UseGuards(JwtAuthGuard, RolesGuard)
        @Delete(':id')
        async delete(@Param('id', ParseIntPipe) id:number){
            return await this.cronogramaService.delete(id)
        }
}
