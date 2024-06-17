import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/models/Chat.schema';

@Module({
  // controllers: [ChatController],
  // providers: [ChatService]
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
  MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema } ])],
  controllers: [ChatController],
   providers: [ChatService],
  exports:[ChatService]

})
export class ChatModule {}
