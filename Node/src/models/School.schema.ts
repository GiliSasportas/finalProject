import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "./User.chema";
import { Class } from "./Class.schema";
export type schoolDocument = HydratedDocument<School>;

@Schema()
export class School {

    @Prop({ required: true, })
    schoolName: string;
    @Prop({ required: true, })
    institutionSymbol: string;
    @Prop({ required: true, })
    usersList:Array<User>
    @Prop({ required: true, })
    classList:Array<Class>
}

export const schoolschema = SchemaFactory.createForClass(School);
