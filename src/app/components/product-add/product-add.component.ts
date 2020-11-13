import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/models/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {


  enabled: boolean = false;

  message: string = '';
  
  categories: Array<ProductCategory> = [];

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll()
      .then((response) =>{
        this.categories = response;
      })
      .catch( error => {
        alert("Category service error: " + error.status);
      });
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get categoryId() { return this.productForm.get('categoryId'); }
  get description() { return this.productForm.get('description'); }

  add() {
    let product = new Product();
    product.productId = 0;
    // product.productCategoryId = this.categoryId.value;
    product.productCategoryId = 2;
    product.name = this.name.value;
    product.description = this.description.value;
    product.price = Number(this.price.value);

    console.log(product);

    this.productService.add(product)
      .then(response => {
        this.message = " Product successfully added";
      }).catch( error => {
        alert("Product add error: " + error);
      });
  }

  enableAdd() {
    this.enabled = true;
    console.log(this.enabled);
  }

}
