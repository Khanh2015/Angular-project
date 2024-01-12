import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onDelete(id: number) {
    const confirmDelete = confirm('Bạn có muốn xóa không?');
    if (confirmDelete && id) {
      this.productService.deleteProduct(id).subscribe((data) => {
        alert('Xóa sản phẩm thàn công');
        this.getProductList();
      });
    }
  }
}
