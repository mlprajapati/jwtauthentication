import {Product} from '../model/product';
import config from '../config';
var Q = require('q');
const loadJsonFile = require('load-json-file');

export class ProductService {
    
    constructor() {
       
      }

    public getProducts(){
        var deferred = Q.defer();
        loadJsonFile('app/services/data/product.json').then((productList:Array<Product>) =>{
            if(productList) {
                deferred.resolve(productList);
            } else {
                deferred.resolve();
            }
           
        });
        return deferred.promise;
    }

}