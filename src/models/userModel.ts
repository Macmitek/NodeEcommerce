import mongoose, { Document, Schema } from 'mongoose';

// Interface representing the document (single user)
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
}

// Mongoose schema for User
const userSchemaObj: Record<string, any> = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: function (this: UserDocument) {
      return this.password === this.confirmPassword;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const userSchema: Schema<UserDocument> = new mongoose.Schema(userSchemaObj);

// Define and export UserModel as a TypeScript class
const UserModel = mongoose.model<UserDocument>('UserModel', userSchema);

export default UserModel;
