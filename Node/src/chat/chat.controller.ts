import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
 

  @Post()
  async create(@Body() chatData: string) {
    console.log("in chat c");
    
    return this.chatService.create(chatData);
  }

  @Get()
  async getAll() {
    return this.chatService.getAll();
  }
}
