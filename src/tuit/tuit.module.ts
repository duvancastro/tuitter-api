import { Module } from '@nestjs/common';
import { TuitService } from './tuit.service';
import { TuitController } from './tuit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './entities/tuit.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tuit,User])],
  controllers: [TuitController],
  providers: [TuitService],
})
export class TuitModule {}

