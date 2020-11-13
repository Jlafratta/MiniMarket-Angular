import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/services/product.service';

import { CustomValidators } from 'src/app/common/custom-validators';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  /**
   * PRACTICA INPUT OUTPUT
   * con event emitter
   */
  @Input()
  products: Array<Product> = [];

  @Output()
  selectedProductEvent = new EventEmitter<Product>();

  productaso = new Product();

  /******* *******/





  product: Product = new Product();
  categories: Array<ProductCategory> = [];
  edit: boolean = false;

  message = "";

  /**
   * Product FromGroup
   */
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(10), CustomValidators.lettersOnly()] , [CustomValidators.nameExists(this.productService)] ),
    price: new FormControl('', [Validators.required]),
    categoryId: new FormControl('1' /*, [Validators.required]*/),
    description: new FormControl('', [CustomValidators.forbiddenWords(/sape/)])
  });

  constructor(private productService: ProductService, private route: ActivatedRoute, private nav: Router) { }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.paramMap.get('id'));
    
    // this.productService.getById(productId)
    //   .then(response => {
    //     this.setForm(response);
    //   })
    //   .catch( error => {
    //     alert(error.status);
    //   });
    this.productService.getById(productId)
      .then(response => {
        this.setForm(response);
      })
      
  }

  /**
   * Form getters
   */
  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get categoryId() { return this.productForm.get('categoryId'); }
  get description() { return this.productForm.get('description'); }

  /**
   * Set default values to form
   * @param product 
   */
  setForm(product: Product) {
    this.name.setValue(product.name);
    this.price.setValue(product.price);
    this.categoryId.setValue(product.productCategoryId);
    this.description.setValue(product.description);
  }

  switchEdit(){
    this.edit = this.edit === false ? true : false;
  }

  /**
   * Edit product
   */
  editProduct(){

    let productId = Number(this.route.snapshot.paramMap.get('id'));
    let product = new Product();
    product.productId = Number(productId);
    product.productCategoryId = Number(this.categoryId.value);
    product.name = this.name.value;
    product.price = this.price.value;
    product.description = this.description.value;

    this.productService.update(product)
      .then(response => {
        this.message = "Product successfully updated ";
      })
      .catch(error => {
        this.message = "An error ocurred on update: " + error.status;
      });
  }

  deleteProduct(){
    let productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.delete(productId)
      .then(response => {
        this.nav.navigate(['/products']);   // Redirecciono al listado de productos
      })
  }











  /**
   * PRACTICA INPUT OUTPUT
   * con event emitter
   */
  selectProduct(){
    this.productaso.name =" MENUDO PRODUCTO ";
    this.selectedProductEvent.emit(this.productaso);
  }
  
}
