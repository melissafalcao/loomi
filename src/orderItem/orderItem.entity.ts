import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @Column()
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
}
