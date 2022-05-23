import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { UsersModule } from './users/users.module';
import {User} from "./users/entities/user.entity";
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User],
    synchronize: true,
  }),
    AuthModule,
    JwtModule,
    UsersModule,
    PostModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
