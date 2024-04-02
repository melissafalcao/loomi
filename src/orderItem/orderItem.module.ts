import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './orderItem.entity';
import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';
import { Order } from 'src/order/order.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order]), AuthModule],
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
