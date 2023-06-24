import {CronogramaService} from './cronograma.service';
import {Body,Controller,Get,Param,ParseIntPipe,Post,Put,Delete, UsePipes, ValidationPipe, UseGuards, UnauthorizedException} from '@nestjs/common';
import {CronogramaDto} from './dto/cronograma-dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetPrincipal } from './decorators/get-principal.decorator';
import { MessageDto } from 'src/common/message.dto';

@Controller('cronograma')
export class CronogramaController {
    constructor(private readonly cronogramaService: CronogramaService){}

        @UseGuards(JwtAuthGuard)
        @Get()
        async getall(@GetPrincipal() user: any){
          if(user.roles.indexOf('administrador') < 0) throw new UnauthorizedException(new MessageDto('no tiene permisos para realizar esta acción'));
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
