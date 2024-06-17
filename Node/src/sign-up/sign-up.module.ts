import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  User, UserSchema} from 'src/models/User.chema';
import { Class,classSchema } from 'src/models/Class.schema';
import { FileSchema } from 'src/models/file.schema';


@Module({

    imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: File.name, schema: FileSchema },{ name: Class.name, schema: classSchema }])],
    controllers: [SignUpController],
    providers: [SignUpService],
    
    exports:[SignUpService]

})
export class SignUpModule {}
