import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { STATUS_CODES } from 'http';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/User.chema';
import { SendEmailService } from 'src/send-email/send-email.service';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>, private jwtService: JwtService, private sendMail: SendEmailService) { }
    //get all users to alphon students.
    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    // this func active from auth srvice and return user with this password
    async getById(pass: string, email: string): Promise<User> {
        const userPassword = await this.userModel.findOne({ password: pass, email: email ,});
        if (!userPassword) {
            throw new ExceptionsHandler().isHttpError(STATUS_CODES.NOT_FOUND);
        }
        return userPassword;
    }
    // return a type user
    async getType(token: any) {
        const payload = this.jwtService.decode(token);
        token = payload;
        const type = token.type;
        return type;

    }
    async users(user: User) {
        return user;
    }

    async sendPassToValidMail(details: any) {
        try {
            const user = await this.userModel.findOne({ idUser: details.id, email: details.email }).exec();
            if (user) {
                try {
                    const pass = this.generatePassword();
                    this.sendMail.sendEmail(details.email, "אימות משתמש ", pass);
                    return pass;
                }
                catch {
                    throw new Error('בעיה בשליחת המייל')
                }
            }
            else {
                throw new Error('משתמש לא רשום במערכת')
            }
        }
        catch {
            throw new Error("בעיה בעת שליחת המייל")
        }

    }
    generatePassword() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        console.log(password, "🔻🔺🔹🔹🔷🔷🔸🔸🔶");
        return password;
    }

    async updatePass(details: any) {
        const user = await this.userModel.findOne({ idUser: details.body.id, email: details.body.email }).exec();

        if (user) {
        
            
            const pass=details.body.password;
            // const saltRounds = 10;
            // const hashedPassword = await bcrypt.hash(pass, saltRounds);

            user.password = details.body.password;
            user.save();
        }
        else {

            return  new Error("משתמש לא קיים במערכת, עבור להרשמה")
        }
    }
}