import * as supertest from "supertest";
import {Product} from '../app/model/product';
import config from '../app/config';
import {ProductService} from "../app/services/productService";
describe("Get user list", () => {
    let objProductService:ProductService;
    beforeEach(() => {
        objProductService = new ProductService();
    });
    it('should return resolve', () => {
        expect(objProductService.getProducts()).resolves;
    });
    it('should return product list with data', () => {
        return objProductService.getProducts().then((data:any) =>{
            expect(data.length).not.toBeUndefined();
            expect(data.length).toBeGreaterThan(0);
        });
    });
});