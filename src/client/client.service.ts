import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createClientDto: CreateClientDto,
    createUserDto: CreateUserDto,
  ): Promise<Client> {
    const newUser = await this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      type: 'client',
    });
    await this.userRepository.save(newUser);
    const client = this.clientRepository.create({
      userId: newUser.id,
      fullName: createClientDto.fullName,
      phone: createClientDto.phone,
      address: createClientDto.address,
      status: createClientDto.status,
    });
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepository.findOne({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    this.clientRepository.merge(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
