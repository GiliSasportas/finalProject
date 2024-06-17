import { Body, Controller, Get, HttpStatus, Param, Headers, Post, Request, Res, Put } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtService } from '@nestjs/jwt';
import { send } from 'process';
import { SendEmailService } from 'src/send-email/send-email.service';


@Controller('Login')
export class LoginController {

    constructor(private auth: AuthService, private login: LoginService, private mail: SendEmailService) { }
    // in login get token with data encoding

    @Post()
    async findById(@Res() response, @Body() dataLogin) {
        try {
       
            const tokenUser = await this.auth.signIn(dataLogin.body);
            return response.status(HttpStatus.OK).json({
                tokenUser,
            })
        }
        catch {
            throw response.status(HttpStatus.NOT_FOUND).send("המשתמש לא קיים");
        }
    }
    @Get()
    getAll() {
        return this.login.getAll();
    }
    //func that decode from token the type.
    @Post('/decode')
    getType(@Body() req) {
        return this.login.getType(req.Headers.Authorization);
    }
    @Get('/byUser')
    async searchUser(@Headers() headers: any) {
        const tokenUser = await this.auth.decodingToken(headers.token);
        return this.login.users(tokenUser);
    }

    @Post('/validationUser')
    async sendPassToMail(@Body() req, @Res() res) {
        try {
            return res.status(HttpStatus.OK).send(await this.login.sendPassToValidMail(req.body));
        }
        catch {
            return res.status(HttpStatus.NOT_FOUND).send("משתמש  לא רשום");
        }
    }

    @Put()
    async updatePass(@Body() body: any, @Res() res) {
        try {
            return res.status(HttpStatus.CREATED).send(this.login.updatePass(body));
        }
        catch (error) {

            res.status(HttpStatus.NOT_FOUND).send(error);
        }
    }

  

}