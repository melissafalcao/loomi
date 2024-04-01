import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './orderItem.entity';
import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';
import { Order } from 'src/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order])],
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
