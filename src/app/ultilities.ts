import Swal from 'sweetalert2';

export function getAccessToken() {
  const userInfo = JSON.parse(localStorage.getItem('loggedInUser') as string);
  return userInfo ? userInfo.accessToken : '';
}

export function checkAdminRole() {
  const userInfo = JSON.parse(localStorage.getItem('loggedInUser') as string);
  if (userInfo && userInfo.user.role !== 'admin') {
    Swal.fire(
      'NO !',
      'Chỉ tài khoản admin mới có quyền sử dụng chức năng này',
      'warning'
    );
    return false;
  }
  return true;
}
