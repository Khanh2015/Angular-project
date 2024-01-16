import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../../../components/client/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
})
export class ProductDetailComponent implements OnInit {
  product!: ProductType;
  category!: string;

  relatedProducts!: ProductType[];

  id!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  // ngOnInit() {
  //   this.id = this.route.snapshot.params['id'];
  //   this.productService.getProduct(this.id).subscribe((data) => {
  //     this.product = data;
  //     this.category = data.category;

  //     this.productService.getProducts().subscribe((products) => {
  //       const result = products.filter(
  //         (item) =>
  //           item.category === this.category && String(item.id) !== this.id
  //       );
  //       this.relatedProducts = result;
  //     });
  //   });
  // }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.getProduct(this.id).subscribe((data) => {
        this.product = data;
        this.category = data.category;

        this.productService.getProducts().subscribe((products) => {
          const result = products.filter(
            (item) =>
              item.category === this.category && String(item.id) !== this.id
          );
          this.relatedProducts = result;
        });
      });
    });
  }
}
