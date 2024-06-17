import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
import { jwtConstants } from './auth.constants';
import { InjectModel } from '@nestjs/mongoose';
import { School, schoolDocument } from 'src/models/School.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/User.chema';
import mongoose from 'mongoose';


@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private login: LoginService, @InjectModel('School') private readonly schoolModel: Model<schoolDocument>, @InjectModel('User') private readonly userModel: Model<UserDocument>) { }
  async signIn(userDetails:any) {
    
    const user = await this.login.getById(userDetails.password, userDetails.email);
    
    const school = await this.schoolModel.findOne({ institutionSymbol: userDetails.symbol })
    const userschool = await this.userModel.findOne({ idSchool: school?.institutionSymbol })
    if (school === null || userschool?.idSchool != school?.institutionSymbol) {
      throw new Error("ישנה בעיה בסמל מוסד יתכן והוא שגוי או לא תואם למשתמש");
    }
    
    if (user?.password !== userDetails.password) {
      throw new UnauthorizedException();
    }
    const payload = { password: user.password, name: user.firstname + " " + user.lastname, type: user.type, idUser: user.idUser,idStudent:userDetails.idStudent };
    // create a token.
    
    return {
      access_token: await this.jwtService.signAsync(payload, {
        // expiresIn: '60s', // Token expires after 60 seconds
        secret: jwtConstants.secret,
      }),
      type:user.type
    }
  }

  decodingToken = (token: any) => {
    try {
      const payload = this.jwtService.decode(token);
      token = payload;
      return token;
    }
    catch {
      throw new Error("this token isnt valid!")
    }
  }
}