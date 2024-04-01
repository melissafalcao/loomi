import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Client } from './client/client.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Product } from './product/product.entity';
import { OrderItemModule } from './orderItem/orderItem.module';
import { OrderItem } from './orderItem/orderItem.entity';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'loomi-bd',
      entities: [User, Client, Product, Order, OrderItem],
      synchronize: true,
    }),
    UserModule,
    ClientModule,
    AuthModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AppModule {}
