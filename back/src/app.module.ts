import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.8.117',//'192.168.1.34',   vérif ipconfig
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