import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "./User.chema";
import { MessageForum } from "./MessageForum.schema";
import mongoose from "mongoose";

export type forumDocument = HydratedDocument<Forum>;

@Schema()
export class Forum {

    @Prop({ required: true, })
    classId: mongoose.Types.ObjectId;

    @Prop({ required: true, })
    messages: Array<MessageForum>;


}

export const forumSchema = SchemaFactory.createForClass(Forum);
