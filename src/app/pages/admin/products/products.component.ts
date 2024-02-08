import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CategoryType } from '../../../types/category';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { checkAdminRole } from '../../../ultilities';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];
  categories: CategoryType[] = [];
  categoryName!: string;
  currentPage: number = 1;
  totalPages: number = 0;
  searchForm: FormGroup;
  searchKeyword!: string;
  selectedCategories: boolean[] = [];
  isFiltering: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getListCategory();
      this.searchKeyword = params['query'];
      this.categoryName = this.activatedRoute.snapshot.params['name'];
      if (this.categoryName) {
        this.getProductsCategory();
      } else if (this.searchKeyword) {
        this.searchListProduct();
      } else {
        this.getListProductPaginate();
        this.getListCategory();
      }
    });
  }

  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getListProductPaginate() {
    this.productService
      .getProductsPaginate(this.currentPage, 5)
      .subscribe((data: any) => {
        this.products = data.docs;
        this.totalPages = data.totalPages;
      });
  }

  getListCategory() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.selectedCategories = new Array(this.categories.length).fill(false);
    });
  }

  onCategoryChange(index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedCategories[index] = isChecked;
    this.isFiltering = this.selectedCategories.some((value) => value); // Cập nhật trạng thái lọc
    this.filterProductsByCategory();
  }

  filterProductsByCategory() {
    const selectedCategoryNames = this.categories
      .filter((_, index) => this.selectedCategories[index])
      .map((category) => category.name);
    this.productService.getProducts().subscribe((data) => {
      this.products = data.filter((product) =>
        selectedCategoryNames.includes(product.category)
      );
    });
  }

  getProductsCategory() {
    this.productService
      .getProducts()
      .subscribe(
        (data) =>
          (this.products = data.filter(
            (product) => product.category === this.categoryName
          ))
      );
  }

  searchListProduct() {
    this.productService
      .searchProducts(this.searchKeyword)
      .subscribe((data) => (this.products = data));
  }

  changePage(newPage: number) {
    if (this.isFiltering) {
      return; // Nếu đang lọc, không cho phép chuyển trang
    }
    if (newPage < 1 || newPage > this.totalPages) {
      return; // Ngăn không cho người dùng chuyển đến trang không tồn tại
    }
    this.currentPage = newPage;
    this.getListProductPaginate();
  }

  onDelete(id: string) {
    if (!checkAdminRole()) return;
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

  onSearch() {
    const keyword = this.searchForm.get('keyword')!.value;
    this.router.navigate(['admin/products/search'], {
      queryParams: { query: keyword },
    });
  }

  notFound() {
    Swal.fire('NO !', 'Không tìm thấy sản phẩm nào', 'error');
  }
}
