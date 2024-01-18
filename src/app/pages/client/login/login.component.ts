import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ShowValidateComponent } from '../../../components/admin/show-validate/show-validate.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ShowValidateComponent,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('NO !', 'Vui lòng nhập dữ liệu đủ các trường', 'warning');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        Swal.fire('Success...', 'Đăng nhập thành công', 'success');
        this.router.navigateByUrl('/admin');
      },
      (error) => {
        console.log(error);
        if (error.error.message === 'Email chưa được đăng ký') {
          return this.loginForm.controls['email'].setErrors({ notFound: true });
        }

        if (error.error.message === 'Mật khẩu không đúng') {
          return this.loginForm.controls['password'].setErrors({
            incorrectPassword: true,
          });
        }
      }
    );
  }
}
