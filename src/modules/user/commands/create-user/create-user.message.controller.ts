import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { CreateUserCommand } from './create-user.command';
import { CreateUserMessageRequest } from './create-user.request.dto';
import { CreateUserService } from './create-user.service';

@Controller()
export class CreateUserMessageController {
  constructor(private readonly service: CreateUserService) {}

  @MessagePattern('user.create') // <- Subscribe to a microservice message
  async create(message: CreateUserMessageRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(message);

    const id = await this.service.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}