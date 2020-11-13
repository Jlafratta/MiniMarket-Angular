import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input()
  products: Array<Product> = [];

  @Output()
  selectedProductEvent = new EventEmitter<Product>();

  productaso = new Product();

  constructor() { }

  ngOnInit(): void {
  }

  selectProduct(){
    this.productaso.name =" MENUDO PRODUCTO ";
    this.selectedProductEvent.emit(this.productaso);
  }
  
}
