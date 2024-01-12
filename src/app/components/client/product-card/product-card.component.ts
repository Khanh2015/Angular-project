import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [RouterLink],
})
export class ProductCardComponent {
  @Input() product!: ProductType;

  ngOnInit() {}
}
