import mongoose, { Schema, Document } from 'mongoose';

// Interface representing the document (single product)
export interface ProductDocument extends Document {
  name: string;
  price: number;
  categories: string[];
  averageRating?: number;
  discount?: number;
  description: string;
  stock: number;
  brand: string;
  createdAt: Date;
}

// Define Mongoose schema for Product
const productSchemaObj: Record<string, any> = {
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique: [true, 'Product name must be unique'],
    maxlength: [40, 'Product name should be less than 40 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    validate: {
      validator: function(this: ProductDocument, value: number) {
        return value > 0;
      },
      message: 'Price of the product should be greater than 0',
    },
  },
  categories: {
    type: [String],
    required: true,
  },
  averageRating: Number,
  discount: {
    type: Number,
    validate: {
      validator: function(this: ProductDocument, value: number) {
        return value < this.price;
      },
      message: 'Discount price should be less than the product price',
    },
  },
  description: {
    type: String,
    required: [true, 'Please provide the description'],
    maxlength: [400, 'Product description should be less than 400 characters'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide the stock'],
    validate: {
      validator: function(this: ProductDocument, value: number) {
        return value >= 0;
      },
      message: 'Stock should be greater than or equal to 0',
    },
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

// Create Mongoose schema for Product
const productSchema: Schema<ProductDocument> = new mongoose.Schema(productSchemaObj);

// Create and export ProductModel as default
const ProductModel = mongoose.model<ProductDocument>('ProductModel', productSchema);

export default ProductModel;
