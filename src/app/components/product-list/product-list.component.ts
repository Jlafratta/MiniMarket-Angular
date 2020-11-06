import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Array<Product> = []
  categories: Array<ProductCategory> = []
  catFilter: number = 0;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

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

    if(this.catFilter > 0) {
      this.getFiltered();
    }else {
      this.getAll();
    }
  }

}
