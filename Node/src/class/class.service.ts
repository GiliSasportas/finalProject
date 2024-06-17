import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, classDocument } from 'src/models/Class.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/User.chema';
@Injectable()
export class ClassService {
  constructor(@InjectModel('Class') private readonly classModel: Model<classDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>) { }
  async getAll(symbol: any) {
    const classes = await this.classModel.find({ symbolSchool: symbol }).exec()

    
    return classes;
  }


  async getAllStudent(user: any) {
    let userChildClass;
    if (user.type === 'Parent') {
      const userfind = await this.userModel.findOne({ idUser: user.idUser });
      const userChild = await this.userModel.findOne({ idUser: user.idStudent });
      userChildClass = await this.classModel.findOne({ _id: userChild.classId });
    }
    else {
      const userChild = await this.userModel.findOne({ idUser: user.id })
      userChildClass = await this.classModel.findOne({ _id: userChild.classId });
    }

    return userChildClass;
  }
}