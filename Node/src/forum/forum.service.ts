import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { forumDocument, Forum } from 'src/models/Forum.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/models/User.chema';
import { messageForumDocument } from 'src/models/MessageForum.schema';
import { schoolDocument, School } from 'src/models/School.schema';
import { classDocument } from 'src/models/Class.schema';
import mongoose from 'mongoose';
@Injectable()
export class ForumService {
  constructor(@InjectModel('Forum') private readonly forumModel: Model<forumDocument>, private auth: AuthService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('MessageForum') private readonly MessageForum: Model<messageForumDocument>,
    @InjectModel('School') private readonly schoolModel: Model<schoolDocument>,
    @InjectModel('Class') private readonly classesModel: Model<classDocument>) { }

  async getUserMessage(token: any) {
    const user = this.auth.decodingToken(token)
    // const userDetails = await this.userModel.findOne({ idUser: user.idUser })
    if (user.type === 'Teacher') {
      let forums = []
      return forums;
    }
    if (user.type === 'Parent') {
      const childDetails = await this.userModel.findOne({ idUser: user.idStudent }).exec()
      const forumClass = await this.forumModel.findOne({ classId: childDetails.classId }).exec()
      return forumClass;
    }
  }

  async createMessage(body: any, token: string) {
    const user = await this.auth.decodingToken(token);
    // const userDetails = await this.userModel.findOne({ idUser: user.idUser }).exec();
    const childDetails = await this.userModel.findOne({ idUser: user.idStudent }).exec();
    const classForum = await this.forumModel.findOne({ classId: childDetails.classId })

    if (user.type === 'Parent') {
      const message = new this.MessageForum({
        userId: user.idUser,
        userName: user.name,
        text: body.text,
        date: new Date(Date.now())
      })

      if (classForum === null) {
        const className = await this.classesModel.findOne({ classId: childDetails.classId })
        new this.forumModel({
          classId: childDetails.classId,
          className: className.className,
          messages: message
        }).save();
      }
      else {
        classForum.messages.push(message);
        classForum.save();
      }
    }
   
  }
   /////////////teacher///////////
  async getAllForumsTeacher(token: any) {
    const user = this.auth.decodingToken(token);
    const userDetails = await this.userModel.findOne({ idUser: user.idUser })
    // const scoolTeacher = await this.schoolModel.findOne({ institutionSymbol: userDetails?.idSchool })
    const list = await Promise.all(userDetails.ListClassesTeaches.map(async (c: any) => {
      const classId = new mongoose.Types.ObjectId(c);
      const clas = await this.classesModel.findOne({ _id: classId }).exec();
      return clas
    }))
    return list;
  }

  async creatMessageTeacher(body: any, token: string) {

    const user = await this.auth.decodingToken(token);

    const userDetails = await this.userModel.findOne({ idUser: user.idUser }).exec();
    const classId = new mongoose.Types.ObjectId(body.class)
    const findclass = await this.classesModel.findOne({ _id: classId }).exec();
    const findForumClass = await this.forumModel.findOne({ classId: findclass._id }).exec();
    const message = new this.MessageForum({
      userId: user.id,
      userName: "teacher " + user.name,
      text: body.text,
      date: new Date(Date.now())
    });

    if (findForumClass === null) {

      const className = await this.classesModel.findOne({ _id: findclass._id }).exec();
      const newForumClass = new this.forumModel({
        classId: className._id,
        className: className.className,
        messages: [message] // Create an array with the message
      });

      await newForumClass.save();
    } else {
      // Push the message to the existing messages array
      findForumClass.messages.push(message);
      await findForumClass.save();
    }
  }

  async getallMessagesOfClass(token: any, clas: any) {

    const classId = new mongoose.Types.ObjectId(clas);
    const forum = await this.forumModel.findOne({ classId: classId }).exec()
    return forum;
  }
}