import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { VotosDto } from './dto/votos.dto';
import { VotosService } from './votos.service';

@Controller('votos')
export class VotosController {
    constructor (
        private readonly votoService: VotosService
        ){}

    @Get()
    async getAll(){
        return await this.votoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id',ParseIntPipe) id:number){
        return await this.votoService.findById(id);
    }
    
    @Post()
    async create(@Body() dto:VotosDto){
        return await this.votoService.create(dto);
    }

}
