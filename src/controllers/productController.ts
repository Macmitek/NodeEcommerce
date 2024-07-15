import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getProducts();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const product = await this.productService.getProductById(productId);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const product = await this.productService.updateProduct(productId, req.body);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const product = await this.productService.deleteProduct(productId);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
