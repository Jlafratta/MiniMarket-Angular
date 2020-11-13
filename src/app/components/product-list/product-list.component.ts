import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output()
  productList: Array<Product> = []


  productaso = new Product();

  categories: Array<ProductCategory> = []
  catFilter: number = 0;
  cartCounter: number = 0;

  constructor(
      private productService: ProductService, 
      private categoryService: CategoryService, 
      private cartService: CartService
    ) { }

  ngOnInit(): void {

    this.getAll();

    this.categoryService.getAll()
      .then(response => {
        this.categories = response;
      })
      .catch(error => {
        alert('Category service error: ' + error.status);
      });
  }

  showProductaso(product: Product) {
    this.productaso = product;
  }

  getAll() {
    this.productService.getAll()
      .then(response => {
        this.productList = response;
      })
      .catch(error => {
        alert('Product service error: ' + error.status);
      });
  }

  getFiltered() {
    this.productService.getAll()
      .then(response => {
        this.productList = response.filter(prod => {
          return prod.productCategoryId == this.catFilter;
        });
      })
      .catch(error => {
        alert('Product service error: ' + error.status);
      });
  }

  // Depende el caso, podria filtrarse directamente sobre el array del componente
  // En este caso actualiza la api y filtra por si hay nuevos resultados
  filter(){
    this.catFilter = Number(this.catFilter);

    if(this.catFilter) {
      this.getFiltered();
    }else {
      this.getAll();
    }
  }

  addToCart(product: Product) {
    this.cartService.add(product);
    this.cartCounter = this.cartService.count();
  }

}
