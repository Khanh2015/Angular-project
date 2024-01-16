import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLink],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogOut() {
    Swal.fire({
      title: 'Đăng xuất?',
      text: 'Bạn chắc chắn muốn đăng xuất tài khoản?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('loggedInUser');
        Swal.fire('Done !', 'Đăng xuất tài khoản thành công', 'success');
        this.router.navigateByUrl('/');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Đã hủy', 'Bạn đã hủy thao tác thành công', 'error');
      }
    });
  }
}
