import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  constructor(private websocketService: WebsocketService) {}
  userName = '';

  onRegister(): void {
    this.websocketService.register(this.userName);
    this.userName = "";
  }
}
