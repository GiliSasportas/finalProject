import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService, private auth: AuthService) { }
  @Get()
  getAllStudent(@Headers() headers: any) {
    return this.classService.getAll(headers.symbol);
  }

  @Get('/byStudent')
  async getAll(@Headers() headers: any) {
    const User = await this.auth.decodingToken(headers.token);
    return this.classService.getAllStudent(User);
  }
}