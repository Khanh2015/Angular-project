import { Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { ClientComponent } from './layouts/client/client.component';
import { LoginComponent } from './pages/client/login/login.component';
import { SignupComponent } from './pages/client/signup/signup.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { AddproductComponent } from './pages/admin/addproduct/addproduct.component';
import { ProductDetailComponent } from './pages/client/product-detail/product-detail.component';
import { canActivate } from './guards/can-access-admin.guard';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { CategoryFormComponent } from './pages/admin/category-form/category-form.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UserFormComponent } from './pages/admin/user-form/user-form.component';
import { UserUpdateFormComponent } from './pages/admin/user-update-form/user-update-form.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [canActivate],
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: AddproductComponent },
      { path: 'products/update/:id', component: AddproductComponent },
      { path: 'products/search', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'category/:name', component: ProductsComponent },
      { path: 'categories/add', component: CategoryFormComponent },
      { path: 'categories/update/:id', component: CategoryFormComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: UserFormComponent },
      { path: 'users/update/:id', component: UserUpdateFormComponent },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
];
