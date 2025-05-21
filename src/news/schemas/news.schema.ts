import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ versionKey: false })
export class News {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  url: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
