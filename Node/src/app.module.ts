
import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { SignUpController } from './sign-up/sign-up.controller';
import { SignUpService } from './sign-up/sign-up.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/User.chema';
import { TaskModule } from './task/task.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { MessageModule } from './message/message.module';
import { Task, taskSchema } from './models/Task.schema';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { School, schoolschema } from './models/School.schema';
import { AuthController } from './auth/auth.controller';
import { Class, classSchema } from './models/Class.schema';
import { ForumModule } from './forum/forum.module';
import { Forum, forumSchema } from './models/Forum.schema';
import { MessageForum, messageForumSchema } from './models/MessageForum.schema';
import { SendEmailModule } from './send-email/send-email.module';
import { SendEmailService } from './send-email/send-email.service';
import { SendEmailController } from './send-email/send-email.controller';
import { ClassModule } from './class/class.module';
import { ClassController } from './class/class.controller';
import { ClassService } from './class/class.service';
import { File, FileSchema } from './models/file.schema';
import { ChatModule } from './chat/chat.module';
import { Chat, ChatSchema } from './models/Chat.schema';

// import { SocketModule } from '@nestjs/platform-socket.io';
// import { WebSocketModule } from '@nestjs/websockets';
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/schoolSystem'),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Task.name, schema: taskSchema },
    , { name: School.name, schema: schoolschema }, { name: Class.name, schema: classSchema }, { name: File.name, schema: FileSchema }
    , { name: Forum.name, schema: forumSchema }, { name: MessageForum.name, schema: messageForumSchema },{ name: Chat.name, schema: ChatSchema }]),
    TaskModule,
    MessageModule,
    AuthModule,
    ForumModule,
    SendEmailModule,
    ClassModule,
    // WebSocketModule.forRoot({
    //   // Optional configuration for socket.io
    // }),
    ChatModule,
    // ChatModule,
  ],
  controllers: [AppController, LoginController, SignUpController, TaskController, AuthController, SendEmailController, ClassController],
  providers: [AppService, LoginService, SignUpService, JwtService, AuthService, SendEmailService, TaskService, ClassService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule { }

