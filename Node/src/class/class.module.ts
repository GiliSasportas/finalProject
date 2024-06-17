import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class, classSchema } from 'src/models/Class.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema,User } from 'src/models/User.chema';
import { AuthController } from 'src/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
import { School, schoolschema } from 'src/models/School.schema';
import { SendEmailService } from 'src/send-email/send-email.service';



@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
  MongooseModule.forFeature([{ name: Class.name, schema: classSchema },{ name: User.name, schema: UserSchema },{ name: School.name, schema: schoolschema }])],
  controllers: [ClassController,AuthController],
  providers: [ClassService,AuthService,JwtService,LoginService,SendEmailService],
  exports:[ClassService,AuthService,JwtService]

})
export class ClassModule {}