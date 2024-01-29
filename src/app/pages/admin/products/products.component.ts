import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CategoryType } from '../../../types/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];
  categories: CategoryType[] = [];

  // search & filter
  productName!: string;
  selectedCategory!: string;

  displayedProducts = [...this.products];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    console.log(this.displayedProducts);
    this.getProductList();
    this.getListCategory();
  }

  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.displayedProducts = [...this.products];
    });
  }

  getListCategory() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
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

  handleInputChange() {
    let searchList = [...this.products];

    if (this.productName) {
      searchList = searchList.filter((product) =>
        product.title
          .toLocaleLowerCase()
          .includes(this.productName.toLocaleLowerCase())
      );
    }

    if (this.selectedCategory && this.selectedCategory !== '') {
      searchList = searchList.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    this.displayedProducts = searchList;
    console.log(this.displayedProducts);
  }
}
