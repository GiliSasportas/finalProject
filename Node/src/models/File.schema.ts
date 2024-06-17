
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Types } from "./types";
import mongoose from "mongoose";
export type fileDocument = HydratedDocument<File>;

@Schema()
export class File {

    @Prop({ required: true, })
    fileName: string;

    @Prop({ required: true, })
    _id: mongoose.Types.ObjectId

    @Prop({ required: true, })
    buffer: string;

    @Prop({ required: true, })
    mimetype: string;

    @Prop({ required: true, })
    type: Types;

    @Prop({ required: function () { return this.type === Types.TASK} })
    taskId: string;
    

    @Prop({ required: function () { return this.type === Types.DETAILS} })   
     classId: string;
    

    @Prop({ required: function () { return this.type === Types.DETAILS} })  
      classNameDetails: string;


}

export const FileSchema = SchemaFactory.createForClass(File);
