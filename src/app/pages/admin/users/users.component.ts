import { UserService } from './../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../../../types/user';
import Swal from 'sweetalert2';
import { checkAdminRole } from '../../../ultilities';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class UsersComponent implements OnInit {
  users!: UserType[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getListUser();
  }

  getListUser() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  onDelete(id: string) {
    if (!checkAdminRole()) return;
    if (id) {
      Swal.fire({
        title: 'Xóa tài khoản?',
        text: 'Bạn chắc chắn muốn xóa tài khoản này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.value) {
          this.userService.deleteUser(id).subscribe((data) => {
            Swal.fire('Đã xóa!', 'Xóa tài khoản thành công', 'success');
            this.getListUser();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Đã hủy', 'Bạn đã hủy thao tác thành công', 'error');
        }
      });
    }
  }
}
