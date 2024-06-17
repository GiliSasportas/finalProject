import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
export type taskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

    @Prop({ required: true, })
    subjectId: string;

    @Prop({ required: true, })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true, })
    teacherId: string;

    @Prop({ required: true, })
    subjectName: string;

    @Prop({ required: true, })
    taskText: string;

    @Prop({ required: true, })
    studetDoIt: Array<any>;

    @Prop()
    lessonDescription: string

    @Prop({ required: true, })
    date: Date;

    @Prop({ required: true, })
    Remarks: Array<any>;

    @Prop({ required: true, })
    Classes: Array<any>;
}

export const taskSchema = SchemaFactory.createForClass(Task);
