import {CronogramaService} from './cronograma.service';
import {Body,Controller,Get,Param,ParseIntPipe,Post,Put,Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import {CronogramaDto} from './dto/cronograma-dto';

@Controller('cronograma')
export class CronogramaController {
    constructor(private readonly cronogramaService: CronogramaService){}
        @Get()
        async getall(){
          return await this.cronogramaService.getall();
        }
        
        @Get(':id')
        async getOne(@Param('id', ParseIntPipe) id: number){
          return await this.cronogramaService.findById(id);
        }

        @UsePipes(new ValidationPipe({whitelist: true}))
        @Post()
        async create(@Body() dto: CronogramaDto){
          return await this.cronogramaService.create(dto);
        }
        
        @UsePipes(new ValidationPipe({whitelist: true}))
        @Put(':id')
        async update(@Param('id',ParseIntPipe) id: number, @Body() dto:CronogramaDto){
          return await this.cronogramaService.update(id,dto);
        }

        @Delete(':id')
        async delete(@Param('id', ParseIntPipe) id:number){
            return await this.cronogramaService.delete(id)
        }
}
