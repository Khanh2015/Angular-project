import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Partial<ProductType>;
  // constructor() {
  //   this.product = {};
  // }

  ngOnInit() {}
}
