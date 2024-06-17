import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { File } from "buffer";
import { HydratedDocument } from "mongoose";

export type messageDocument = HydratedDocument<Message>;

@Schema()
export class Message {

    @Prop({ required: true, })
    writeName: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    count: Number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    classesToMessage: Array<string>;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
