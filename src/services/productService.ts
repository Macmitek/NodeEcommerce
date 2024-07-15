
import { ConnectDb } from '../common/mongoconfig';
import ProductModel ,{ProductDocument } from '../models/productModel';

export class ProductService {
  private db: ConnectDb;

  constructor() {
    this.db = ConnectDb.getInstance();
  }

  public async createProduct(product: any): Promise<ProductDocument> {
    try {
      await this.db.connect();
      const createdProduct = await ProductModel.create(product);
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  public async getProducts(): Promise<ProductDocument[]> {
    try {
      await this.db.connect();
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  public async getProductById(productId: string): Promise<ProductDocument | null> {
    try {
      await this.db.connect();
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(productId: string, product: any): Promise<ProductDocument | null> {
    try {
      await this.db.connect();
      const updatedProduct = await ProductModel.findByIdAndUpdate(productId, product, { new: true });
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProduct(productId: string): Promise<ProductDocument | null> {
    try {
      await this.db.connect();
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}
