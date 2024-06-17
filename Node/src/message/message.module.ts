import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message,MessageSchema } from 'src/models/Message.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
import { School, schoolschema } from 'src/models/School.schema';
import { User, UserSchema } from 'src/models/User.chema';
import { SendEmailService } from 'src/send-email/send-email.service';
import { SendEmailController } from 'src/send-email/send-email.controller';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),


  
  MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema },{ name: School.name, schema: schoolschema },{ name: User.name, schema: UserSchema },])],
 
  controllers: [MessageController,SendEmailController],
  providers: [MessageService,AuthService,JwtService,LoginService,SendEmailService]
})
export class MessageModule {}
