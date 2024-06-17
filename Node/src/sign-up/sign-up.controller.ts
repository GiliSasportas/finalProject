import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors, Headers } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { User } from 'src/models/User.chema';

@Controller('sign-up')
export class SignUpController {
    constructor(private signUpService: SignUpService) { }
    @Post()
    async CreateParents(@Body() req) {
        this.signUpService.CreateUser(req.body);
    }
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
        if (!file) {
            return res.status(404).send('File not found');
        }
        try {
            this.signUpService.saveFile(file);
            res.status(201).send("the file saved in data");
        }
        catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).send('Internal server error');
        }
    }

    @Get('getFile')
    @UseInterceptors(FileInterceptor('file'))
    async getFile(@Res() res: Response) {
        try {
            const file = await this.signUpService.getFileDetails();
            if (!file) {
                return res.status(404).send('File not found');
            }
            const fileName = `filename.xls`; // Specify the desired filename and extension
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(file);
        } catch (error) {
            console.error('Error downloading file:', error);
            res.status(500).send('Internal server error');
        }
    }
    @Post('excel')
    async createUser(@Body() req: any) {
        console.log("in exel control");
        
        // this.signUpService.CreateUsers(req.body);
        return this.signUpService.CreateUsers(req.body);
    }
}