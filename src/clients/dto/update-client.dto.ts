import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    enterprise?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: number;
}
