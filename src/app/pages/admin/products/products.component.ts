import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  onDelete(id: string) {
    if (id) {
      Swal.fire({
        title: 'Xóa sản phẩm?',
        text: 'Bạn chắc chắn muốn xóa sản phẩm này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.value) {
          this.productService.deleteProduct(id).subscribe((data) => {
            Swal.fire('Đã xóa!', 'Xóa sản phẩm thành công', 'success');
            this.getProductList();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Đã hủy', 'Bạn đã hủy thao tác thành công', 'error');
        }
      });
    }
  }
}
