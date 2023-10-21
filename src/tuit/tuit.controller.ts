import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TuitService } from './tuit.service';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';
import { Tuit } from './entities/tuit.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('tuit')
export class TuitController {
  constructor(private readonly tuitService: TuitService) {}

  @Post()
  create(@Body() createTuitDto: CreateTuitDto): Promise<Tuit> {
    return this.tuitService.create(createTuitDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
    return this.tuitService.findAll(pagination);
  }

  @Get(':id') //tuit/id
  findOne(@Param('id') id: number): Promise<Tuit> {
    return this.tuitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTuitDto: UpdateTuitDto,
  ): Promise<Tuit> {
    return this.tuitService.update(id, updateTuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tuitService.remove(id);
  }
}
