import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.authService
      .login(this.loginForm.value)
      .subscribe((data) =>
        localStorage.setItem('loggedInUser', JSON.stringify(data))
      );
  }
}
