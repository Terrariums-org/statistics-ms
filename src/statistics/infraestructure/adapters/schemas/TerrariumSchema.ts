import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'terrariums',
})
export class Terrarium extends Document {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({
    type: {
      t_max: { type: Number, required: true },
      t_min: { type: Number, required: true },
      t_value: { type: Number, required: true },
    },
    required: true,
  })
  temperature: {
    t_max: number;
    t_min: number;
    t_value: number;
  };

  @Prop({
    type: {
      h_max: { type: Number, required: true },
      h_min: { type: Number, required: true },
      h_value: { type: Number, required: true },
    },
    required: true,
  })
  humidity: {
    h_max: number;
    h_min: number;
    h_value: number;
  };

  @Prop({
    type: {
      nitrogen: { type: Number, required: true },
      phosphorous: { type: Number, required: true },
      potassium: { type: Number, required: true },
    },
    required: true,
  })
  soil: {
    nitrogen: number;
    phosphorous: number;
    potassium: number;
  };

  @Prop({
    type: {
      uv_max: { type: Number, required: true },
      uv_min: { type: Number, required: true },
      uv_value: { type: Number, required: true },
    },
    required: true,
  })
  uv: {
    uv_max: number;
    uv_min: number;
    uv_value: number;
  };
}

export const TerrariumSchema = SchemaFactory.createForClass(Terrarium);
