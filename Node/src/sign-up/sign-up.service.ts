import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { error, log } from 'console';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { classDocument } from 'src/models/Class.schema';

import { File, fileDocument, } from 'src/models/file.schema';
import { schoolDocument } from 'src/models/School.schema';
import { Types } from 'src/models/types';
import { User, UserDocument } from 'src/models/User.chema';
import { types } from 'util';

@Injectable()
export class SignUpService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('File') private readonly fileModel: Model<fileDocument>,
    @InjectModel('School') private readonly schoolModel: Model<schoolDocument>,
    @InjectModel('Class') private readonly classModel: Model<classDocument>, private auth: AuthService,) { }
  async CreateUser(u: User): Promise<User> {
    try {
      const createdUser = new this.userModel(u);
      return createdUser.save();
    }
    catch {
      throw error("The details have not been completed")
    }

  }
  async saveFile(file: Express.Multer.File) {
    // save the file in the DB and convert the buffer to base64 cod
    try {
      const detailUsers = new this.fileModel({
        _id: mongoose.Types.ObjectId,
        mimetype: file.mimetype,
        buffer: file.buffer.toString('base64'),
        fileName: file.fieldname,
        classId: '456',
        classNameDetails: 'ז1',
        type: Types.DETAILS
      })
      // לראות מה עושים כדי שיכניס את הנתונים לקולקשיין אחר.
      return detailUsers.save();
    }
    catch {
      console.log("🙈🙈🙈🙈🙈🙈🙈");

      throw new Error("this file dont saved---");
    }

  }

  async getFileDetails() {
    let _idFile = new mongoose.Types.ObjectId("65de824b2c54bbdee3a5afc3")
    let getDetailsFile = await this.fileModel.findOne({ _id: _idFile }).exec();

    // const file = getDetailsFile[(getDetailsFile.length - 1)];
    if (!getDetailsFile) {
      throw new Error("file not found")
    }
    const fileUrl = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + getDetailsFile.buffer;
    return fileUrl;
  }

  async creatUserDetails(details:any,classRoom:any){
    
    for (const user of details.users) {
       user.classId = classRoom._id;
      if (user.type === 'Student') {
        await new this.userModel(user).save();
        classRoom.classStudentsList.push(user);
        classRoom.save();
      }
      console.log("befor for");

      if (user.type === 'Parent') {
        const parent = await this.userModel.findOne({ idUser: user.idUser }).exec();

        if (parent != null) {
          console.log("ppppppp", user.idChild, "user.idChild[0]");
          await parent.idChild.push(user.idChild);
          await parent.save();
        }

        else {
          console.log("parent not exist");

        const newParent = await new this.userModel(user).save();
        newParent.idChild.push(user.idChild);
        newParent.save();
        }

      }
    }

  }

  async CreateUsers(details: any) {
    console.log(details, "details");
    console.log("in exel service");

    try {
      const classroom = await this.classModel.findOne({ className: details.className, symbolSchool: details.symbol }).exec()
      console.log(classroom, "classroom1");
      console.log("1234");

      if (classroom) {
        console.log("in if");
        // return ("הכיתה כבר קיימת");
        this.creatUserDetails(details,classroom);
        return "התלמיד/ התלמידים נוספו בהצלחה לכיתה"
      }
      console.log("not exist");

      const classRoom = await new this.classModel({
        _id: new mongoose.Types.ObjectId(),
        className: details.className,
        symbolSchool: details.symbol,
        yearbook: details.yearbook,
        classStudentsList: new Array
      }).save();

      console.log(classRoom, "classRoom");
this.creatUserDetails(details,classRoom);

      // for (const user of details.users) {
      //   console.log(user, "uuuuuuuuuuuuuu");
      //   user.classId = classRoom._id;
      //   console.log(user.classId, "!!!!!!!!");
      //   if (user.type === 'Student') {
      //     await new this.userModel(user).save();
      //     console.log(user, "user");
      //     classRoom.classStudentsList.push(user);
      //     classRoom.save();
      //   }
      //   console.log("befor for");

      //   if (user.type === 'Parent') {
      //     const parent = await this.userModel.findOne({ idUser: user.idUser }).exec();
      //     console.log(parent);

      //     if (parent != null) {
      //       console.log("ppppppp", user.idChild, "user.idChild[0]");
      //       await parent.idChild.push(user.idChild);
      //       await parent.save();
      //     }

      //     else {
      //       console.log("parent not exist");

      //       await new this.userModel(user).save();
      //       user.idChild.push(user.idChild);
      //       user.save();
      //     }

      //   }
      // }

      // await classRoom.save();
      // classRoom.save();
      console.log("now to register clas");

      //הוספת הכיתה לרשימת הכיתות של המורה
      const user = await this.auth.decodingToken(details.Authorization)
      const userDetails = await this.userModel.findOne({ idUser: user.idUser })
      const id = classRoom._id.toString()
      userDetails.ListClassesTeaches.push(id)
      await userDetails.save();
      console.log("הכיתה נוספה לרשימה של המורה");

      //דחיפה לערך הכיתות של בית הספר
      const school = await this.schoolModel.findOne({ institutionSymbol: details.symbol }).exec();
      school.classList.push(classRoom);
      await school.save();
      console.log("הכיתה נוספה לרשימה של בית הספר");
      return ("הכיתה נוספה בהצלחה")
    }
    catch {
      throw error("The details have not been completed")
    }
  }
  
}