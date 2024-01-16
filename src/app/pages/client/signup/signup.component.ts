import { AuthService } from './../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShowValidateComponent } from '../../../components/admin/show-validate/show-validate.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    ShowValidateComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
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
      'repassword',
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
    this.authService.signUp(this.signUpForm.value).subscribe(
      (response) => this.router.navigateByUrl('auth/login'),
      (error) => {
        if (error.error === 'Email already exists') {
          return this.signUpForm.controls['email'].setErrors({ exists: true });
        }
      }
    );
  }
}
