import { Router, Request, Response} from 'express';
import {ProductService} from '../services/productService';
const router: Router = Router();

export class ProductController {
    router:Router;
    constructor() {
        this.router = Router();
        this.init();
      }
    public getProduct(req:Request, res:Response){
        var productService = new ProductService();
        productService.getProducts()
        .then(function(products:any){
            if (products) {
                res.send(products);
            } else {
                res.status(400).send('No Product');
            }
        })
        .catch(function(err:any){
            res.status(400).send(err);
        });
    }
    init() {
        this.router.get('/', this.getProduct);
    }
    
}
let productController = new ProductController();
productController.init();

export default productController.router;
