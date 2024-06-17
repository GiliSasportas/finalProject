import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
import { LoginModule } from 'src/login/login.module';
import { School, schoolschema } from 'src/models/School.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User.chema';
import { Task, taskSchema } from 'src/models/Task.schema';
import { SendEmailService } from 'src/send-email/send-email.service';

@Module({
  imports: [
    LoginModule,
    JwtModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: School.name, schema: schoolschema }, { name: User.name, schema: UserSchema }, { name: Task.name, schema: taskSchema }]),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),



  ],
  // imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),


  controllers: [AuthController],
  providers: [AuthService, JwtService, LoginService,SendEmailService]

})
export class AuthModule { }
