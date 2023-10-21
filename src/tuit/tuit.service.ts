import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';
import { Tuit } from './entities/tuit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TuitService {
  private readonly logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createTuitDto: CreateTuitDto) {
    try {
      const tuit = await this.tuitRepository.save(
        this.tuitRepository.create(createTuitDto),
      );

      return tuit;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll({ limit, offset }: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Tuit> {
    const tuit = await this.tuitRepository.findOne({ where: { id: id } });
    if (!tuit) throw new NotFoundException('resource not found');
    return tuit;
  }

  async update(id: number, updateTuitDto: UpdateTuitDto): Promise<Tuit> {
    const tuit = await this.findOne(id);
    try {
      const UpdateTuit = await this.tuitRepository.save(
        this.tuitRepository.merge(tuit, updateTuitDto),
      );
      return UpdateTuit;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number): Promise<void> {
    const tuit = await this.findOne(id);
    try {
      this.tuitRepository.remove(tuit);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    else if (error.code === '23502')
      throw new BadRequestException(
        `The column '${error.column}' is required!s`,
      );
    this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!',
    );
  }
}
