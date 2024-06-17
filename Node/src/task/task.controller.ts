import { Body, Controller, Get, Param, Post, UploadedFile, Request, UseInterceptors, Headers, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, StreamableFile, Put, Patch, Head, Header, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import mongoose from 'mongoose';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  @Get('subjects')
  @Roles(Role.Teacher)
  async getSubjectsTeach(@Headers() token: any) {
    const subjectsTeacher = await this.taskService.getSubjectsByTeacher(token.authorization);
    return subjectsTeacher;
  }
  // create new task
  @Post()
  @Roles(Role.Teacher)
  async CreateTask(@Body() req: any) {
    const task = await this.taskService.CreateTask(req.body, req.Headers.Authorization);
    return (task._id);
  }
  // get all the task

  @Get()
  @Roles(Role.Parent)
  async getAllTasks(@Headers() token: any) {
    return await this.taskService.getTasks(token.authorization);
  }

  @Get('taskByTeacher')
  @Roles(Role.Teacher)
  async getTasks(@Headers() token: any) {
    return await this.taskService.getTasksTeacher(token.authorization);
  }

  // get status about specific student - how the tasks he done or not
  @Get('status')
  @Roles(Role.Parent)
  async getStatus(@Headers() token) {
    return await this.taskService.getStatus(token.authorization);
  }

  // upload the file
  @Post('file:taskId')
  @Roles(Role.Teacher)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res, @Param() param) {
    if (!file) {
      return res.status(404).send('File not found');
    }
    this.taskService.saveFile(file, param.taskId);
  }

  @Get('file:taskId')
  @Roles(Role.Parent)
  async downloadFile(@Res() res: Response, @Param() param) {
    try {
      const file = await this.taskService.getFile(param.taskId);
      if (!file) {
        return res.status(404).send('File not found');
      }
      const fileName = `file.pdf`; // Specify the desired filename and extension
      res.setHeader('Content-Disposition', `attachment;filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(file);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @Get('Classes')
  @Roles(Role.Teacher)
  async getClasses(@Headers() req: any, @Res() res) {
    try {
      const classes = await this.taskService.getClass(req.authorization);

      if (classes != null) {
        return res.status(HttpStatus.OK).send(classes);
      }
      else {
        res.status(HttpStatus.NOT_FOUND).send("לא נמצאות כיתות תחת מורה זה.")
      }
    }
    catch {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("ארעה שגיאה במהלך הבקשה");
    }
  }
  // update the task done
  @Put()
  @Roles(Role.Parent)
  async updateTaskDo(@Body() body: any, @Res() res, @Headers() header) {

    try {
      const ans = await this.taskService.updateTaskDo(body.Headers.Authorization, body.body.taskId);      
      return res.status(HttpStatus.OK).send(ans);
    }
    catch {
      return res.status(HttpStatus.BAD_REQUEST).send("the task not found");
    }
  }
  // add a remark to specific task
  @Put('Remarks')
  @Roles(Role.Parent)
  async updateRemark(@Body() req: any, @Res() res) {
    const ans = await this.taskService.creatRemark(req.Headers.Authorization, req.body.Remarks, req.body.idTask);

    if (ans == null)
      return res.status(500).send("ההערה לא נשמה נסה שוב.");
    return res.status(201).send("ההערה נשמרה!");

  }
}



