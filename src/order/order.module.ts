import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItem } from 'src/orderItem/orderItem.entity';
import { OrderItemModule } from 'src/orderItem/orderItem.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), OrderItemModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
