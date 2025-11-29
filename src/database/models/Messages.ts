import { Schema, model, models } from 'mongoose';

interface IMessage {
  name: string;
  email: string
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = models.Message || model<IMessage>('Message', MessageSchema);

export default Message;