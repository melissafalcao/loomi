import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './client.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  create(
    @Body()
    requestBody: {
      createClientDto: CreateClientDto;
      createUserDto: CreateUserDto;
    },
  ): Promise<Client> {
    const { createClientDto, createUserDto } = requestBody;
    return this.clientService.create(createClientDto, createUserDto);
  }

  @Get('get-all')
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clientService.remove(+id);
  }
}
