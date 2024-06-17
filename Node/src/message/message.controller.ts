import { Body, Controller, Get, Patch, Post, Put, Headers } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'src/models/Message.schema';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }
  // create new message

  @Post()
   @Roles(Role.Teacher)
  async creatMessage(@Body() req): Promise<Message> {
    const message = await this.messageService.CreateMessage(req.body, req.Headers.Authorization);
    return message;
  }

  // get the last msg 
  @Get('/last')
  async getlastmessage() {
    return await this.messageService.last();
  }
  // get all message
  @Get()
  async getAllMessage(@Headers() req: any) {
    return await this.messageService.getMessage(req.authorization);
  }
}