import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/roles/role.enum";
import { Class } from "./Class.schema";
import mongoose from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends mongoose.Document {
    @Prop({ required: true, })
    idUser: string;
    @Prop({ required: true, })
    idSchool: string;
    @Prop({ required: true, })
    firstname: string;
    @Prop({ required: true, })
    lastname: string;
    @Prop({ required: true })
    phone: string;
    @Prop({ required: true })
    address: string;
    @Prop({ required: true })
    type: Role;
    @Prop({ required: function () { return this.type === "Parent"; } })
    idChild: Array<String>;
    @Prop({ required: function () { return this.type === "Parent" || this.type === "Teacher"; } })
    email: string;
    @Prop({ required: function () { return this.type === "Parent" || this.type === "Teacher"; } })
    password: string;
    @Prop({ required: function () { return this.type === "Teacher"; }, })
    subjectTeach: Array<string>
    @Prop({ required: function () { return this.type === "Student"; } })
    classId: mongoose.Types.ObjectId;
    @Prop({ required: function () { return this.type === "Teacher"; } })
    ListClassesTeaches: Array<string>
}

export const UserSchema = SchemaFactory.createForClass(User);
