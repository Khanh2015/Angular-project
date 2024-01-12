import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowValidateComponent } from '../../../components/admin/show-validate/show-validate.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  imports: [ReactiveFormsModule, ShowValidateComponent, CommonModule],
})
export class AddproductComponent implements OnInit {
  id!: string;

  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.maxLength(10),
      ]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.maxLength(255),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.maxLength(255),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.maxLength(255),
      ]),
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.productService.getProduct(this.id).subscribe((data) => {
        console.log(this.productForm.status);
        this.productForm.patchValue({
          category: data.category,
          title: data.title,
          price: data.price,
          image: data.image,
          description: data.description,
        });
      });
    }
  }

  onSubmit() {
    const data = this.productForm.value;
    if (!this.id) {
      return this.productService.createProduct(data).subscribe((data) => {
        alert('Thêm sản phẩm thành công');
        this.router.navigateByUrl('admin/products');
      });
    }

    return this.productService
      .updateProduct(this.id, data)
      .subscribe((data) => {
        alert('Cập nhật sản phẩm thành công');
        this.router.navigateByUrl('admin/products');
      });
  }
}
