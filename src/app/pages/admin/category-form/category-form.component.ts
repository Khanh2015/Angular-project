import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShowValidateComponent } from '../../../components/admin/show-validate/show-validate.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, ShowValidateComponent, CommonModule],
})
export class CategoryFormComponent implements OnInit {
  id!: string;
  categoryForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.categoryService.getCategory(this.id).subscribe((data) => {
        console.log(this.categoryForm.status);
        console.log(data);
        this.categoryForm.patchValue({
          name: data.name,
        });
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      Swal.fire('NO !', 'Vui lòng nhập dữ liệu đủ các trường', 'warning');
      return;
    }
    const data = this.categoryForm.value;
    if (!this.id) {
      return this.categoryService.createCategory(data).subscribe((data) => {
        Swal.fire('Success...', 'Thêm danh mục thành công', 'success');
        this.router.navigateByUrl('admin/categories');
      });
    }

    return this.categoryService
      .updateCategory(this.id, data)
      .subscribe((data) => {
        Swal.fire('Success...', 'Cập nhật danh mục thành công', 'success');
        this.router.navigateByUrl('admin/categories');
      });
  }
}
