import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, chatDocument } from 'src/models/Chat.schema';
import { Model } from 'mongoose';


@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<chatDocument>){}

  async create(chatData: string): Promise<Chat> {
    console.log("in service chat");
    
    const chat = new this.chatModel({ message: chatData });
    return chat.save();
  }
  async getAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }
}
