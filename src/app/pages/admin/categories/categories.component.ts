import { ProductService } from './../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CategoryType } from '../../../types/category';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductType } from '../../../types/product';
import { checkAdminRole } from '../../../ultilities';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class CategoriesComponent implements OnInit {
  categories!: CategoryType[];
  products!: ProductType[];
  productCounts!: number[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getListCategory().subscribe(() => {
      this.getListProduct();
    });
  }

  getListCategory() {
    return this.categoryService.getCategories().pipe(
      tap((data) => {
        this.categories = data.map((category) => ({
          ...category,
          quantity: 0,
        })); // Khởi tạo quantity = 0 cho mỗi danh mục
      })
    );
  }

  getListProduct() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      // Đếm số lượng sản phẩm tương ứng với từng danh mục
      this.products.forEach((product) => {
        const category = this.categories.find((category) => {
          return category.name === product.category;
        });
        if (category) {
          category.quantity++;
        }
      });
    });
  }

  onDelete(id: string) {
    if (!checkAdminRole()) return;
    if (id) {
      Swal.fire({
        title: 'Xóa danh mục?',
        text: 'Bạn chắc chắn muốn xóa danh mục này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.value) {
          this.categoryService.deleteCategory(id).subscribe((data) => {
            Swal.fire('Đã xóa!', 'Xóa danh mục thành công', 'success');
            this.getListCategory().subscribe(() => {
              this.getListProduct();
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Đã hủy', 'Bạn đã hủy thao tác thành công', 'error');
        }
      });
    }
  }
}
