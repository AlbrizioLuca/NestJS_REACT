import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CandidatesModule } from './candidates/candidates.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.23.144.1' || 'localhost', 
      // récupérer l' adresse IPv4 WSL 'ipconfig' dans powershell
      port: 3306,
      username: 'AlbrizioLuca',
      password: 'secretPassword',
      database: 'db_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ClientsModule,
    CandidatesModule,
    AddressModule,
  ],
})
export class AppModule {}