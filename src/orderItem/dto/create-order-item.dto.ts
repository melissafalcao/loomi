import { Order } from 'src/order/order.entity';

export class CreateOrderItemDto {
  order: Order;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
