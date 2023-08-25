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
      host: '172.27.48.1' || 'localhost', // si l'appli tourne sur WSL: récupérer l' adresse IPv4 du réseau sur lequel le pc est relié avec la commande 'ipconfig' dans powershell
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