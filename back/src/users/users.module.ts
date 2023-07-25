import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      signOptions: { expiresIn: '1d'}
    })
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    JwtStrategy, 
    JwtAuthGuard, 
    JwtService
  ],
  exports: [UsersService],
})
export class UsersModule {}