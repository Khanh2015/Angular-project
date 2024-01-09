import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menu = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Admin', path: '/admin' },
  ];
  constructor() {}

  ngOnInit() {}
}
