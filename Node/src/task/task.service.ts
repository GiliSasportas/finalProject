import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, taskDocument } from 'src/models/Task.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/models/User.chema';
import { AuthService } from 'src/auth/auth.service';
import { classDocument } from 'src/models/Class.schema';
import mongoose from 'mongoose';
import { Types } from 'src/models/types';
import { fileDocument } from 'src/models/file.schema';
import { log } from 'console';

@Injectable()
export class TaskService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<taskDocument>, @InjectModel('File') private readonly fileModel: Model<fileDocument>, @InjectModel('Class') private readonly classModel: Model<classDocument>, @InjectModel('User')
    private readonly userModel: Model<UserDocument>, private JwtService: JwtService,
        private authService: AuthService) { }

    async CreateTask(task: Task, token: string): Promise<Task> {
        const teacherDetails = this.authService.decodingToken(token);
        console.log(teacherDetails);

        try {
            const newTask = {
                subjectId: task.subjectId,
                subjectName: task.subjectName,
                lessonDescription: task.lessonDescription,
                taskText: task.taskText,
                studetDoIt: [],
                date: task.date,
                Remarks: [],
                teacherId: teacherDetails.idUser,
                Classes: task.Classes,
                _id: new mongoose.Types.ObjectId()
            }
            const CreateTask = new this.taskModel(newTask);
            return CreateTask.save()
        }
        catch {
            throw new Error("")
        }
    }


    // get all task
    // async getTasks(token: any) {
    //     const user = this.authService.decodingToken(token);
    //     let studentDetails = null;
    //     if (user.type === 'Parent') {
    //         const userDetails = await this.userModel.findOne({ idUser: user.idUser }).exec();
    //         const studentId = userDetails.idChild[0];
    //         studentDetails = await this.userModel.findOne({ idUser: studentId }).exec();

    //     }
    //     else {
    //         studentDetails = user;
    //     }

    //     const getAllTaskByUser = await this.taskModel.find({ classId: studentDetails?.classId }).exec();
    //     console.log(getAllTaskByUser, "😉😉😉");
    //     return getAllTaskByUser;
    // }

    async getTasks(token: any) {

        const user = this.authService.decodingToken(token);
        let studentDetails;
        if (user.type === 'Parent') {
            studentDetails = await this.userModel.findOne({ idUser: user.idStudent })
        }
        else {
            studentDetails = user
        }
        let getAllTasks = await this.taskModel.find();
        const allTask = getAllTasks.filter((task: Task) => {
            return task.Classes.includes(studentDetails.classId.toString());
        })
        return allTask;

    }
    async getSubjectsByTeacher(token: any) {
        const user = this.authService.decodingToken(token);
        const teacher = await this.userModel.findOne({ idUser: user.idUser }).exec();
        return teacher.subjectTeach;
    }
    async getStatus(token: any) {
        // get the id student
        let user = this.authService.decodingToken(token);
        let userDetails;
        userDetails = await this.userModel.findOne({ idUser: user.idStudent }).exec();
        let taskInfoState = [];
        // Go over the tasks and according to each task 
        // check whether the student has completed it or not
        // and return array with data abt all task whether done or not
        const tasks = await this.taskModel.find();
        const taskByClass = tasks.filter((task: Task) => {
            return task.Classes.includes(userDetails.classId);
        })
        taskByClass.forEach((task: Task) => {
            let doIt = false;
            for (let i = 0; i < task.studetDoIt.length; i++) {
                if ((task.studetDoIt[i] === user.idUser || task.studetDoIt[i].id === user.idUser))
                    doIt = true;
            }
            if (doIt)
                taskInfoState = [...taskInfoState, { task: task, doIt: true }];
            else
                taskInfoState = [...taskInfoState, { task: task, doIt: false }];
        });

        return taskInfoState;
    }
    // save file on data
    async saveFile(file: Express.Multer.File, taskId: string) {
        // save the file in the DB and convert the buffer to base64 code
        try {
            const taskFile = new this.fileModel({
                _id: mongoose.Types.ObjectId,
                mimetype: file.mimetype,
                fileName: file.originalname,
                buffer: file.buffer.toString('base64'),
                fieldname: file.fieldname,
                taskId: taskId,
                type: Types.TASK
            })
            return taskFile.save();
        }
        catch {
            throw new Error("this file dont saved---");
        }

    }
    // update the task done
    async updateTaskDo(token: any, idTask: string) {

        try {
            const user = this.authService.decodingToken(token);
            const id = user.idUser;
            const taskId = new mongoose.Types.ObjectId(idTask);
            const task = await this.taskModel.findOne({ _id: taskId }).exec();
            const userExist = task.studetDoIt.find((e: any) => e.id === id);
            if (userExist) {
                return "עדכנת כבר את משימה זו כנעשתה."
            }

            const userChild = await this.userModel.findOne({ idUser: user.idStudent }).exec();

            task.studetDoIt.push({ id: user.idUser, name: userChild.firstname + " " + userChild.lastname + "," });
            await task.save();
            return "המשימה עודכנה כנעשתה"
        }

        catch {

            return new Error("הפעולה לא הושלמה");
        }

    }

    async getFile(taskId: any) {
        try {
            let taskFile = await this.fileModel.findOne({ taskId: taskId }).exec();
            const fileUrl = "data:application/pdf;base64," + taskFile.buffer;
            return fileUrl;
        }
        catch {
            throw new Error("file not found")
        }
    }
    // create a remark to this task
    async creatRemark(token: any, Remark: string, idTask: string) {
        try {
            const user = this.authService.decodingToken(token);
            const iduser = user.idUser;
            let userDetails = await this.userModel.findOne({ idUser: iduser }).exec();
            const taskId = new mongoose.Types.ObjectId(idTask);
            const task = await this.taskModel.findOne({ _id: taskId });
            if (task) {
                task.Remarks.push({ remark: Remark, user: userDetails.firstname + " " + userDetails.lastname });
                return await task.save();
            }
        }
        catch {
            return null;
        }
    }

    async getTasksTeacher(token: any) {
        const user = this.authService.decodingToken(token);
        const getAllTask = await this.taskModel.find({ teacherId: user.idUser }).exec();
        return getAllTask;
    }
    async getClass(token: any) {
        try {
            let user = await this.authService.decodingToken(token);
            user = await this.userModel.findOne({ idUser: user.idUser }).exec();
            console.log(user, "user");
            const classes = user.ListClassesTeaches;
            let listClasses = await this.classModel.find({}).exec();
            let filteredClasses = listClasses.filter(y => {
                const c = classes.some(x => {
                    const isEqual = new mongoose.Types.ObjectId(x).equals(y._id);
                    return isEqual;
                });
                return c;
            });
            return filteredClasses;
        } catch {
            return null;
        }
    }
}
