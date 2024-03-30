import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { UserModule } from './../user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User]), UserModule, AuthModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
