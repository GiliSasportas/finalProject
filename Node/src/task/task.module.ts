import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from 'src/models/Task.schema';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from 'src/models/User.chema';
import { AuthService } from 'src/auth/auth.service';
import { LoginService } from 'src/login/login.service';
import { School, schoolschema } from 'src/models/School.schema';
import { Class, classSchema } from 'src/models/Class.schema';
import { SendEmailService } from 'src/send-email/send-email.service';
import { File, FileSchema } from 'src/models/file.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),

  MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }
    , { name: User.name, schema: UserSchema }, { name: School.name, schema: schoolschema }, { name: File.name, schema: FileSchema }, 
    { name: Class.name, schema: classSchema }])],

  controllers: [TaskController],
  providers: [TaskService, JwtService, AuthService, LoginService,SendEmailService]
})
export class TaskModule {

}
