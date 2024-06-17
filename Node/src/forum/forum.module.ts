import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User.chema';
import { Forum, forumSchema } from 'src/models/Forum.schema';
import { AuthService } from 'src/auth/auth.service';
import { School, schoolschema } from 'src/models/School.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
import { MessageForum, messageForumSchema } from 'src/models/MessageForum.schema';
import { Class, classSchema } from 'src/models/Class.schema';
import { SendEmailService } from 'src/send-email/send-email.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),

  MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Forum.name, schema: forumSchema },{ name: School.name, schema: schoolschema },
    { name: MessageForum.name, schema: messageForumSchema }, {name: Class.name, schema: classSchema }])],
  controllers: [ForumController],
  providers: [ForumService,AuthService,JwtService,LoginService,SendEmailService]
})
export class ForumModule {}
