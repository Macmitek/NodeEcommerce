import express from 'express';
import { ProductController } from '../controllers/productController';
//import { AuthMiddleware } from '../common/auth';

export class productRouter {
  public router: express.Router;
  private productController: ProductController;

  constructor() {
    this.router = express.Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/',  this.productController.createProduct.bind(this.productController));
    this.router.get('/', this.productController.getProducts.bind(this.productController));
    this.router.get('/:productId', this.productController.getProductById.bind(this.productController));
    this.router.put('/:productId',this.productController.updateProduct.bind(this.productController));
    this.router.delete('/:productId', this.productController.deleteProduct.bind(this.productController));
  }
}
