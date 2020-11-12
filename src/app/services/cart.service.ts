import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productList: Array <Product> = [];

  constructor() { }

  getAll() {
    return this.productList;
  }

  add(product: Product) {
    this.productList.push(product);
  }

  count() {
    console.log(this.productList.length)
    return this.productList.length;
  }

}
