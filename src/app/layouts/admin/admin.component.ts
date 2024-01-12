import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/admin/header/header.component';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
