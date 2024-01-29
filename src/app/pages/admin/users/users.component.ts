import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../../../types/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class UsersComponent implements OnInit {
  users!: UserType[];
  constructor() {}

  ngOnInit() {}
}
