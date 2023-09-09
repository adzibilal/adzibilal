// models/Item.ts

import { Schema, model, Document } from 'mongoose';

interface IItem extends Document {
  name: string;
  description: string;
  // tambahkan bidang lain yang diperlukan
}

const itemSchema = new Schema<IItem>({
  name: String,
  description: String,
  // tambahkan bidang lain yang diperlukan
});

export default model<IItem>('Item', itemSchema);
