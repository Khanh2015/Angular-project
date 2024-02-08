import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShowValidateComponent } from '../../../components/admin/show-validate/show-validate.component';
import { CommonModule } from '@angular/common';
import { UserType } from '../../../types/user';
import { checkAdminRole } from '../../../ultilities';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, ShowValidateComponent, CommonModule],
})
export class UserUpdateFormComponent implements OnInit {
  id!: string;
  updateUserForm: FormGroup;
  userList!: UserType[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.updateUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.userService.getUser(this.id).subscribe((data) => {
        this.updateUserForm.patchValue({
          email: data.email,
        });
      });
    }

    this.userService.getUsers().subscribe((data) => (this.userList = data));
  }

  onSubmit() {
    if (this.updateUserForm.invalid) {
      Swal.fire('NO !', 'Vui lòng nhập dữ liệu đủ các trường', 'warning');
      return;
    }
    if (!checkAdminRole()) return;
    const data = this.updateUserForm.value;
    const checkEmailExist = this.userList.find(
      (user) => user.email === data.email && user._id !== this.id
    );
    if (!checkEmailExist) {
      return this.userService.updateUser(this.id, data).subscribe((data) => {
        Swal.fire('Success...', 'Cập nhật tài khoản thành công', 'success');
        this.router.navigateByUrl('admin/users');
      });
    }
    return this.updateUserForm.controls['email'].setErrors({ exists: true });
  }
}
