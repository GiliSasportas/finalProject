import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ForumService } from './forum.service';
import { log } from 'console';


@Controller('forum')

export class ForumController {

  constructor(private forum: ForumService) { }
  @Get()
  async getUserMessages(@Headers() headers) {
    return this.forum.getUserMessage(headers.authorization,);
  }
  @Post()
  async creatForum(@Body() body: any) {
    return this.forum.createMessage(body.body, body.headers.Authorization);
  }

  //////////////////////teacher/////////
  @Get('/byTeacher')
  async getAllForumsTeacher(@Headers() headers) {
    const t = await this.forum.getAllForumsTeacher(headers.authorization);
    return t;
  }
  @Post('/byteacher')
  async creatMessageTeacher(@Body() body: any) {
    return this.forum.creatMessageTeacher(body.body, body.headers.Authorization);
  }


  @Get('/byTeacher/messages')
  async getallMessagesOfClass(@Headers() headers) {  
    return this.forum.getallMessagesOfClass(headers.authorization,headers.class);
  }
}
