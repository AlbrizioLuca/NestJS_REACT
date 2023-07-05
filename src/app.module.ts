import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:  '192.168.8.107', // ? 'localhost', 
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ClientsModule,
    CandidatesModule,
  ],
})
export class AppModule {}