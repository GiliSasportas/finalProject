import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "./User.chema";
import mongoose from "mongoose";

export type classDocument = HydratedDocument<Class>;

@Schema()
export class Class {

    @Prop({ required: true, })
    _id: mongoose.Types.ObjectId

    @Prop({ required: true, })
    className: string

    @Prop({ required: true, })
    symbolSchool: string;

    @Prop({ required: true, })
    yearbook: string;

    @Prop({ required: true, })
    classStudentsList:Array<any>;

}

export const classSchema = SchemaFactory.createForClass(Class);
