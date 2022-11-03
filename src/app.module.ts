import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPE as any,
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      // username: process.env.USERNAME,
      username: 'postgres',
      password: process.env.PASSWORD,
      database: process.env.DBNAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
