import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.1.34' || 'localhost', // Avec la commande 'ipconfig' dans powershell  récupérer l' adresse IPv4 du réseau sans fil si l'appli tourne sur WSL
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
  ],
})
export class AppModule {}