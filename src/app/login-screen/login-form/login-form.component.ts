import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  userName = '';

  ngOnInit(): void {
  }

  onLogin(): void {
    this.websocketService.login(this.userName);
    this.router.navigate(['/main-screen']);
  }
}
