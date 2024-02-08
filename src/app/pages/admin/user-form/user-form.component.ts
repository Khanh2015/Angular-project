import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ShowValidateComponent } from '../../../components/admin/show-validate/show-validate.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, ShowValidateComponent, CommonModule],
})
export class UserFormComponent {
  signUpForm: FormGroup;

  constructor(private AuthService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup({});

    this.signUpForm.addControl(
      'email',
      new FormControl('', [Validators.email, Validators.required])
    );
    this.signUpForm.addControl(
      'password',
      new FormControl('', [Validators.required, Validators.minLength(4)])
    );
    this.signUpForm.addControl(
      'confirmPassword',
      new FormControl('', [
        Validators.required,
        this.checkConfirmPassword.bind(this),
      ])
    );
  }

  checkConfirmPassword(control: AbstractControl): ValidationErrors | null {
    let password = this.signUpForm.get('password')!.value;
    let confirmPassword = control.value;

    if (confirmPassword !== '' && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      Swal.fire('NO !', 'Vui lòng nhập dữ liệu đủ các trường', 'warning');
      return;
    }
    this.AuthService.signUp(this.signUpForm.value).subscribe(
      (response) => {
        Swal.fire('Success...', 'Thêm tài khoản thành công', 'success');
        this.router.navigateByUrl('admin/users');
      },
      (error) => {
        if (error.error.message === 'Email đã được đăng ký') {
          return this.signUpForm.controls['email'].setErrors({ exists: true });
        }
      }
    );
  }
}
