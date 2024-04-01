import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './../orderItem/orderItem.entity';
import { CreateOrderItemDto } from './../orderItem/dto/create-order-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<Order> {
    console.log(createOrderDto);
    console.log(createOrderItemDto);
    const order = await this.orderRepository.create({
      clientId: createOrderDto.clientId,
      status: createOrderDto.status,
      orderTotal: createOrderDto.orderTotal,
    });
    const savedOrder = await this.orderRepository.save(order);

    const orderItem = await this.orderItemRepository.create({
      order: savedOrder,
      productId: createOrderItemDto.productId,
      quantity: createOrderItemDto.quantity,
      unitPrice: createOrderItemDto.unitPrice,
      subtotal: createOrderItemDto.subtotal,
    });
    await this.orderItemRepository.save(orderItem);
    return savedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async getOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOne({ where: { id: id } });
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.getOrderById(id);
    this.orderRepository.merge(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.getOrderById(id);
    await this.orderRepository.remove(order);
  }
}
