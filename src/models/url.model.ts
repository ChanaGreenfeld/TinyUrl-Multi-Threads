import { Document, Model, Schema, model } from 'mongoose'

interface IUrl {
  url: string;
  shortId: string;
  clicks : number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUrlDocument extends IUrl, Document { }

interface IUrlModel extends Model<IUrlDocument> { }

const UrlSchema = new Schema<IUrlDocument, IUrlModel>({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },

}, { timestamps: { createdAt: true, updatedAt: true } });

export default model<IUrlDocument, IUrlModel>('Url', UrlSchema, 'urls');