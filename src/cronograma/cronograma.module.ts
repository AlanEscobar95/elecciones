import { Module } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaController } from './cronograma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramasEntity } from './cronograma.entity';


@Module({
  imports:[TypeOrmModule.forFeature([CronogramasEntity])],
  providers:[CronogramaService],
  controllers:[CronogramaController]
})
export class CronogramaModule {}
