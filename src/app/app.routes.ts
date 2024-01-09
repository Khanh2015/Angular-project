import { Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { ClientComponent } from './layouts/client/client.component';
import { LoginComponent } from './pages/client/login/login.component';
import { SignupComponent } from './pages/client/signup/signup.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductsComponent } from './pages/admin/products/products.component';

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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
    ],
  },
];
