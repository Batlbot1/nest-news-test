import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {JwtModule} from "../jwt/jwt.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
      JwtModule,
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
