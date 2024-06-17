import { Injectable } from '@nestjs/common';
import { Message, messageDocument } from 'src/models/Message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Console, error, log } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { SendEmailService } from 'src/send-email/send-email.service';
import { User, UserDocument } from 'src/models/User.chema';
import mongoose from 'mongoose';
import { message } from './message.enum';

@Injectable()
export class MessageService {
   constructor(@InjectModel('Message') private readonly MessageModel: Model<messageDocument>,
      @InjectModel('User') private readonly userModel: Model<UserDocument>, private auth: AuthService, private sendMail: SendEmailService) { }
   async CreateMessage(message: Message, token: any): Promise<Message> {
      const user = this.auth.decodingToken(token);
      message.writeName = user.name;
      const createMessage = await new this.MessageModel(message);
      const users = await Promise.all(message?.classesToMessage?.map(async (c: any) => {
         const classId = new mongoose.Types.ObjectId(c);
         const y = await this.userModel.find({ classId: classId, type: 'Student' }).exec();
         return y;
      }));
      const y = await this.userModel.find({ type: 'Parent' }).exec();
      let parent = [];
      y.map((p: User) => {
         users.map((s: any) => {
            const flag = this.childParent(p, s)
            if (flag == true) {
               parent.push(p);
            }
         })
      })
      parent.map((parent: any) => {
         if (parent?.email != null && /\S+@\S+\.\S+/.test(parent?.email)) {

            this.sendMail.sendEmail(parent.email, message.title, message.content);
         }
      })
      return createMessage.save();
   }

   async getMessage(token: any) {

      try {
         const user = this.auth.decodingToken(token);
         const userDetails = await this.userModel.findOne({ idUser: user.idUser }).exec();
         const userChild = await this.userModel.findOne({ idUser: userDetails.idChild }).exec();
         const allMessages = await this.MessageModel.find().exec();
         const messages = allMessages.filter((message: Message) => {
            return message.classesToMessage.includes(userChild.classId.toString());
         })

         return messages;
      }
      catch {
         throw error("not found")
      }
   }

   async last(): Promise<any> {
      const messageL = await this.MessageModel.findOne().sort({ _id: -1 }).exec();
      return messageL;
   }

   childParent(parent: User, student: any) {
      const t = parent.idChild.includes(student[0].idUser);
      return t;
   }
}