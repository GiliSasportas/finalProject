import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { File } from "buffer";
import { HydratedDocument } from "mongoose";

export type chatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {

    @Prop({ required: true })
    userId: string;
  
    @Prop({ required: true })
    userName: string;
  
    @Prop({ required: true })
    date: string;
  
    @Prop({ required: true })
    text: string;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
