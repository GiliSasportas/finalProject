import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "./User.chema";

export type messageForumDocument = HydratedDocument<MessageForum>;

@Schema()
export class MessageForum {

    @Prop({ required: true, })
    userId: string;

    @Prop({ required: true, })
    userName: string;
    
    @Prop({ required: true, })
    date: string;

    @Prop({ required: true, })
    text: string;

}

export const messageForumSchema = SchemaFactory.createForClass(MessageForum);
