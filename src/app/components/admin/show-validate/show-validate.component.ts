import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-validate',
  templateUrl: './show-validate.component.html',
  styleUrls: ['./show-validate.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ShowValidateComponent implements OnInit {
  @Input() field: any;
  @Input() key!: string;
  constructor() {}

  ngOnInit() {}
}
