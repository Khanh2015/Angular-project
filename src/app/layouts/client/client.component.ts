import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/client/header/header.component';
import { FooterComponent } from '../../components/client/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
})
export class ClientComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
