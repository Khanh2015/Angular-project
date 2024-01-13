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
        path: 'product/:id',
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
